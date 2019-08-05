<?php
/*
Template Name: Customers
*/

get_header(); 

$refQuery = new WP_Query(array(
    'post_type' => 'reference',
    'posts_per_page' => -1
));

$caseStudyQuery = new WP_Query(array(
    'post_type' => 'reference',
    'posts_per_page' => 1,
    'meta_key' => 'studycase',
    'meta_value' => true,
));
?>

<?php if ( have_posts() ) : the_post(); ?>

        <?php get_template_part('includes/header-page'); ?>

		<section>
            <div class='container wrapper-customers'>
                <?php
					if( have_rows('numbers', 'options') ) : $numbers = [];
						while( have_rows('numbers', 'options') ) : the_row();
							$numbers[] = [get_sub_field('textBottom'), get_sub_field('text'), get_sub_field('number')];
						endwhile;
					endif;
				?>
                <?php if( $refQuery->have_posts() ) : $count = 0; $countNb = 0; ?>
                    <h2 class='h1 small-margin-bottom'><?php the_title(); ?></h2>
                    <?php the_field('customersText'); ?>
                    <ul class='home-ref-list'>
                        <?php while( $refQuery->have_posts() ) : $refQuery->the_post(); $count++; ?>
                            <li>
                                <?php $img = wp_get_attachment_image(get_field('logo'), 'full', '', array('alt' => get_the_title())); ?>
                                <?php if( get_field('studycase') ) : ?>
                                    <button class="ref clickable js-case-study" type="button" data-ref-id="<?php the_ID() ?>">
                                        <span class="btn-hexagon small">
                                            <span class="hexagon"></span>
                                            <svg class="icon icon-small-arrow down"><use xlink:href="#icon-small-arrow"></use></svg>
                                        </span>
                                        <?php echo $img; ?>
                                    </button>
                                <?php else : ?>
                                    <div class="ref">
                                        <?php echo $img; ?>
                                    </div>
                                <?php endif; ?>
                            </li>
                            <?php if( ($count == 1 || ($count > 3 && ($count+2)%3 == 0)) && $count < 10 ) : ?>
                                <li>
                                    <div class='ref number'>
                                        <div>
                                            <?php if( $numbers[$countNb][0] ) : ?>
                                                <span><?php echo $numbers[$countNb][1]; ?></span>
                                            <?php endif; ?>
                                            <span class='nb'><?php echo $numbers[$countNb][2]; ?></span>
                                            <?php if( !$numbers[$countNb][0] ) : ?>
                                                <span><?php echo $numbers[$countNb][1]; ?></span>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                </li>
                            <?php $countNb++; endif; ?>
                        <?php endwhile; ?>
                    </ul>
                <?php wp_reset_postdata(); endif; ?>
            </div>
        </section>
        <section class="ref-slider js-ref-slider">
            <div class="hexagon-loader js-loader">
                <span class="hexagon"></span>
                <div class="spinner-wrapper">
                    <span class="spinner"></span>
                </div>
            </div>
            <?php if ($caseStudyQuery->have_posts()) :?>
            <?php while ($caseStudyQuery->have_posts()) : $caseStudyQuery->the_post(); ?>
            <div class="ref-slide ref-slide-init js-ref-current-slide js-ref-id-<?php the_ID() ?>" data-ref-id="<?php the_ID() ?>">
                <?php 
                    get_template_part('/includes/reference');
                ?>
            </div>
            <?php endwhile; ?>
            <?php wp_reset_postdata(); ?>
            <?php endif; ?>
        </section>
        <?php $map = get_field('map'); if( $map ) : ?>
            <section class='container'>
                <div class='wrapper-customers-map container-small'>
                    <?php echo wp_get_attachment_image($map['img'], 'full'); ?>
                    <div class='wrapper-txt'>
                        <h2 class='big no-margin-bottom'><span><?php echo $map['title1']; ?></span> <?php echo $map['title2']; ?></h2>
                        <p><?php echo $map['text']; ?></p>
                    </div>
                </div>
            </section>
        <?php endif; ?>
		
	<?php endif; ?>

<?php get_footer(); ?>