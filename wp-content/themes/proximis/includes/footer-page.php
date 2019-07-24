<?php $bottom = get_field('bottom'); if( $bottom ) : ?>
    <footer class='footer-page'>
        <div class='container'>
            <h2 class='h1'><?php echo $bottom['title']; ?></h2>
            <?php echo $bottom['text']; ?>
            <?php if( $bottom['link'] ) : ?>
                <p><a href="<?php echo $bottom['link']['url']; ?>" class='link'><span><?php echo $bottom['link']['title']; ?></span><i></i></a></p>
            <?php endif; ?>
        </div>
    </footer>
<?php endif; ?>