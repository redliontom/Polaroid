function DataAccessLayer() {
    var self = this;
    var _pg = require('pg');
    var _util = require('./Utility');
    var _sanitizer = require('sanitizer');
    // postgres://username:password@localhost/database
    var _connection = 'postgres://polaroidadmin:password@localhost:5432/polaroid';

    // BO
    var _user = require('./BO/User');
    var _photo = require('./BO/Photo');
    var _message = require('./BO/Message');
    var _comment = require('./BO/Comment');
    var _friend = require('./BO/Friend');

    this.getUserStatus = function (username, callback) {
        sql('SELECT status FROM public.user WHERE username=$1', [username], function (error, rows) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, rows[0].status);
            }
        });
    };

    this.getUserData = function (username, password, callback) {
        sql('SELECT * FROM public.user WHERE username=$1', [username], function (error, rows) {
            if (error) {
                return callback(error, null);
            } else {
                callback(null, _user(rows[0]));
            }
        });
    };

    this.setUserRealName = function (username, forename, surname, callback) {
        transaction('UPDATE public.user SET forename=$2, surname=$3 where username=$1', [username, forename, surname], callback);
    };

    this.setUserMail = function (username, email, callback) {
        transaction('UPDATE public.user SET email=$2 where username=$1', [username, email], callback);
    };

    this.setUserPrivacy = function (username, privacy, callback) {
        transaction('UPDATE public.user SET privacy=$2 where username=$1', [username, privacy], callback);
    };

    this.setUserStatus = function (username, status, callback) {
        transaction('UPDATE public.user SET status=$2 where username=$1', [username, status], callback);
    };

    this.trySetUserPassword = function (username, oldpw, newpw, callback) {
        sql('SELECT func_change_user_password($1,$2,$3) AS result', [username, oldpw, newpw], function (error, frows) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, frows[0].result);
            }
        });
    };

    this.verifyUserPassword = function (username, password, callback) {
        sql('SELECT func_verify_user($1,$2) AS result', [username, password], function (error, frows) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, frows[0].result);
            }
        });
    };

    this.addUser = function (username, password, callback) {
        this.toHash(password, function (error, hash) {
            if (error) {
                callback(error, null);
            } else {
                transaction('INSERT INTO public.user (username, password) VALUES ($1,$2)', [username, hash], callback);
            }
        });
    };

    this.removeUser = function (username, callback) {
        transaction('DELETE FROM public.user WHERE username=$1', [username], callback);
    };

    this.getUserFriends = function (username, callback) {
        var query = 'SELECT public.user.username AS username, public.user.forename AS forname, ';
        query += 'public.user.surname AS surname, public.friend.status AS status ';
        query += 'FROM public.user JOIN public.friend ON public.user.username = public.friend.user1 ';
        query += 'WHERE public.friend.user1=$1';

        sql(query, [username], function (error, rows) {
            if (error) {
                return callback(error, null);
            }

            var result = [];

            for (var i in rows) {
                result.push(_friend(rows[i]));
            }

            callback(null, result);
        });
    };

    this.addFriend = function (username, friendname, callback) {
        transaction('INSERT INTO public.friend (user1, user2) VALUES ($1,$2)', [username, friendname], function (error, rows) {
            if (error) {
                return callback(error, null);
            }

            transaction('INSERT INTO public.friend (user1, user2) VALUES ($1,$2)', [friendname, username], callback);
        });
    };

    this.removeFriend = function (username, friendname, callback) {
        transaction('DELETE FROM public.friend WHERE public.friend.user1=$1 AND public.friend.user2=$2', [username, friendname], function (error, rows) {
            if (error) {
                return callback(error, null);
            }

            transaction('DELETE FROM public.friend WHERE public.friend.user1=$1 AND public.friend.user2=$2', [friendname, username], callback);
        });
    };

    this.acceptFriend = function (username, friendname, callback) {
        transaction('UPDATE public.friend SET status=TRUE WHERE public.friend.user1=$1 AND public.friend.user2=$2', [username, friendname], function (error, rows) {
            if (error) {
                return callback(error, null);
            }

            transaction('UPDATE public.friend SET status=TRUE WHERE public.friend.user1=$1 AND public.friend.user2=$2', [friendname, username], callback);
        });
    };

    this.getSentMessages = function (username, limit, offset, callback) {
        var query = '';
        query += 'SELECT public.message.id AS id, public.message.fromuser AS fromuser, public.message.touser AS touser, ';
        query += 'public.message.subject AS subject, public.message.text AS text, public.message.time AS time ';
        query += 'FROM public.message JOIN public.user ON public.message.fromuser = public.user.username ';
        query += 'WHERE public.user.username=$1 ORDER BY public.message.time DESC LIMIT $2 OFFSET $3';

        sql(query, [username, limit, offset], function (error, rows) {
            if (error) {
                return callback(error, null);
            }

            var result = [];

            for (var i in rows) {
                result.push(_message(rows[i]));
            }

            callback(null, result);
        });
    };

    this.getReceivedMessages = function (username, limit, offset, callback) {
        var query = '';
        query += 'SELECT public.message.id AS id, public.message.fromuser AS fromuser, public.message.touser AS touser, ';
        query += 'public.message.subject AS subject, public.message.text AS text, public.message.time AS time ';
        query += 'FROM public.message JOIN public.user ON public.message.touser = public.user.username ';
        query += 'WHERE public.user.username=$1 ORDER BY public.message.time DESC LIMIT $2 OFFSET $3';

        sql(query, [username, limit, offset], function (error, rows) {
            if (error) {
                return callback(error, null);
            }

            var result = [];

            for (var i in rows) {
                result.push(_message(rows[i]));
            }

            callback(null, result);
        });
    };

    this.sendMessage = function (from, to, subject, text, callback) {
        transaction('INSERT INTO public.message (fromuser, touser, subject, text) VALUES ($1,$2,$3,$4)', [from, to, subject, text], callback);
    };

    this.getPhotoComments = function (photo, limit, offset, callback) {
        var query = '';
        query += 'SELECT public.comment.photo AS photo, public.comment.user AS user, public.comment.text AS text, public.comment.time AS time ';
        query += 'FROM public.comment JOIN public.user ON public.comment.user = public.user.username ';
        query += 'JOIN public.photo ON public.photo.id = public.comment.photo ';
        query += 'WHERE public.photo.id = $2 ORDER BY public.comment.time ASC LIMIT $3 OFFSET $4';

        sql(query, [photo, limit, offset], function (error, rows) {
            if (error) {
                return callback(error, null);
            }

            var result = [];

            for (var i in rows) {
                result.push(_message(rows[i]));
            }

            callback(null, result);
        });
    };

    this.getPhotoLikeCount = function (photo, callback) {
        var query = '';
        query += 'SELECT count(*) AS count FROM public.photo JOIN public.like ON public.like.photo = public.photo.id ';
        query += 'WHERE public.photo.id = $1';

        sql(query, [photo], function (error, rows) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, rows[0].count);
            }
        });
    };

    this.getPhotoLikeUsers = function (photo, callback) {
        var query = '';
        query += 'SELECT public.user.username AS username FROM public.photo JOIN public.like ON public.like.photo = public.photo.id ';
        query += 'JOIN public.user ON public.like.user = public.user.username WHERE public.photo.id = $1';

        sql(query, [photo], function (error, rows) {
            if (error) {
                return callback(error, null);
            }

            var n = rows.length;
            var result = [];

            for (var i = 0; i < rows.length; i++) {
                self.getUserData(rows[i].username, function (error, user) {
                    if (error) {
                        i = rows.length;
                        return callback(error, null);
                    }

                    result.push(user);

                    if (--n <= 0) {
                        callback(null, result);
                    }
                });
            }
        });
    };

    this.addPhotoComment = function (photo, user, comment, callback) {
        transaction('INSERT INTO public.comment (photo, username, comment) VALUES ($1,$2,$3)', [photo, user, comment], callback);
    };

    this.getPhotosFromUser = function (username, callback) {
        sql('SELECT id FROM public.photo WHERE user=$1', [username], function (error, rows) {
            if (error) {
                return callback(error, null);
            }

            var result = [];

            for (var i in rows) {
                result.push(rows[i].id);
            }

            callback(null, result);
        });
    };

    this.getPhotoData = function (id, callback) {
        sql('SELECT * FROM public.photo WHERE id=$1', [id], function (error, rows) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, _photo(rows[0]));
            }
        });
    };

    this.addPhoto = function (args, callback) {
        transaction(
            'INSERT INTO public.photo (path, title, description, aperture, exposuretime, iso, focallength, flash, time) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
            [args.path, args.title, args.description, args.aperture, args.exposuretime, args.iso, args.focallength, args.flash, args.time],
            callback);
    };

    this.toHash = function (text, callback) {
        sql('SELECT func_hash($1) AS result', [text], function (error, frows) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, frows[0].result);
            }
        });
    };

    var sql = function (query, args1, args2) {
        var callback = null;
        var args = [];

        if (_util.isArray(args1)) {
            args = args1;
            callback = args2;
        } else if (_util.isFunction(args1)) {
            callback = args1;
        }

        if ((!_util.isString(query) || !_util.isArray(args)) && _util.isFunction(callback)) {
            return callback(new Error('invalid arguments'), null);
        } else if (!_util.isFunction(callback)) {
            throw new Error('no callback provided');
        }

        pg.connect(_connection, function (error, client, done) {
            if (error) {
                return callback(error, null);
            }

            client.query(query, args, function (error, result) {
                if (error) {
                    done(error);
                    callback(error, null);
                } else {
                    done();
                    callback(null, result.rows);
                }
            });
        });
    };

    var transaction = function (query, args1, args2) {
        var callback = null;
        var args = [];

        if (_util.isArray(args1)) {
            args = args1;
            callback = args2;
        } else if (_util.isFunction(args1)) {
            callback = args1;
        }

        if ((!_util.isString(query) || !_util.isArray(args)) && _util.isFunction(callback)) {
            return callback(new Error('invalid arguments'), null);
        } else if (!_util.isFunction(callback)) {
            throw new Error('no callback provided');
        }

        pg.connect(_connection, function (error, client, done) {
            if (error) {
                return callback(error, null);
            }

            client.query('BEGIN', function (error) {
                if (error) {
                    rollback(client, done);
                    return callback(error, null);
                }

                sql(query, args, function (error, rows) {
                    if (error) {
                        rollback(client, done);
                        return callback(error, null);
                    }

                    client.query('COMMIT', function (error) {
                        if (error) {
                            rollback(client, done);
                            callback(error, null);
                        } else {
                            done();
                            callback(null, rows);
                        }
                    });
                });
            });
        });
    };

    var rollback = function (client, done) {
        client.query('ROLLBACK', function (error) {
            return done(error);
        });
    };
}

module.exports = function () {
    return new DataAccessLayer();
};
