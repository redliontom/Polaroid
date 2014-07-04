$( document ).ready(function() {
    
    /* Toogle menu right */
    $('.toggle').click(function() {
        $('#toggle_menu').slideToggle( 400 );
        return false;
    });
    
    $('.content').click(function() {
        $('#toggle_menu').hide( 400 );
    });
    
    
    /* Dynamisches nachladen */
    /* News Feed */
    $('#link_feed').click(function() {
        $('.content').load('../acc/files/feed.html', function(){
            $('[id^=write_comment_]').click(function() {
                $var=$(this).attr('id').match(/[0-9]+/)[0];
                $show='.nc_'+$var;
                $($show).slideToggle( 400 );
                return false;
            });
            
            $('[id^=show_comment_]').click(function(){
                $var=$(this).attr('id').match(/[0-9]+/)[0];
                $show='.cs_'+$var;
                $($show).slideToggle(400);
                return false;
            });
        });
    });
    
    /* Upload */
    $('#link_upload').click(function() {
        $('.content').load('../acc/files/upload.html');
        $('#toggle_menu').hide( 400 );
    });
    
    /* Profile */
    $('#link_profile').click(function() {
        $('.section_profile').load('../acc/files/profile.html')
        $('.content').load('../acc/files/gallery.html');
        $('#toggle_menu').hide( 400 );
    });
    
    /* Messages */
    $('#link_messages').click(function() {
        $('.content').load('../acc/files/messages.html');
        $('#toggle_menu').hide( 400 );
    });
    
    /* Settings */
    $('#link_settings').click(function() {
        $('.content').load('../acc/files/settings.html');
        $('#toggle_menu').hide( 400 );
    });
    
    /* Search */
    $('#menu_search').click(function() {
        $('.content').load('../acc/files/search.html');
        $('#toggle_menu').hide( 400 );
    });
    

    /* Default */
    if ($(".content").html() === ""){
        $('.content').load('../acc/files/feed.html', function(){
            $('[id^=write_comment_]').click(function() {
                $var=$(this).attr('id').match(/[0-9]+/)[0];
                $show='.nc_'+$var;
                $($show).slideToggle(400);
                return false;
            });
            
            $('[id^=show_comment_]').click(function(){
                $var=$(this).attr('id').match(/[0-9]+/)[0];
                $show='.cs_'+$var;
                $($show).slideToggle(400);
                return false;
            });
        });
    };
    
});

