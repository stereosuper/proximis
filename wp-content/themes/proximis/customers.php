<?php
/*
Template Name: Customers
*/

get_header(); ?>

<?php if ( have_posts() ) : the_post(); ?>

        <?php get_template_part('includes/header-page'); ?>

		<section>
            <div class='container'>
                <?php
					if( have_rows('numbers', 'options') ) : $numbers = [];
						while( have_rows('numbers', 'options') ) : the_row();
							$numbers[] = [get_sub_field('textBottom'), get_sub_field('text'), get_sub_field('number')];
						endwhile;
					endif;
				?>

                <?php $refQuery = new WP_Query(array('post_type' => 'reference', 'posts_per_page' => -1)); if( $refQuery->have_posts() ) : $count = 0; $countNb = 0; ?>
                    <h2><?php the_title(); ?></h2>
                    <?php the_field('customersText'); ?>
                    
                    <ul class='home-ref-list'>
                        <?php while( $refQuery->have_posts() ) : $refQuery->the_post(); $count++; ?>
                             <li>
                                <?php $img = wp_get_attachment_image(get_field('logo'), 'full', '', array('alt' => get_the_title())); ?>

                                <?php if( get_field('studycase') ) : ?>
                                    <a class='ref' href='<?php the_permalink(); ?>' title='<?php the_title(); ?>'>
                                        <?php echo $img; ?>
                                    </a>
                                <?php else : ?>
                                    <div class='ref'>
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
        
        <?php $map = get_field('map'); if( $map ) : ?>
            <section class='container'>
                <?php echo wp_get_attachment_image($map['img'], 'large'); ?>
                <h2><?php echo $map['title1']; ?> <?php echo $map['title2']; ?></h2>
                <p><?php echo $map['text']; ?></p>
            </section>
        <?php endif; ?>
		
	<?php endif; ?>

<?php get_footer(); ?>