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
    
    /* Settings */
    $('#link_settings').click(function() {
        $('.content').load('../acc/files/settings.html');
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

