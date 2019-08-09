<header class='header-page'>
    <div class='container'>
        <?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

        <h1>
            <?php $title = get_field('title'); if( $title ) : ?>
                <span class='<?php echo $title['white1'] ? 'white' : ''; ?>'>
                    <?php echo $title['title1']; ?>
                </span>
                <span class='<?php echo $title['white2'] ? 'white' : ''; ?>'>
                    <?php echo $title['title2']; ?>
                </span>
            <?php else : the_title(); endif; ?>
        </h1>

        <?php the_field('text'); ?>
    </div>
    <?php the_post_thumbnail('large'); ?>
</header>
