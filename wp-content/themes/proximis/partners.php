<?php
/*
Template Name: Partners
*/

$refQuery = new WP_Query(array(
    'post_type' => 'partner',
    'posts_per_page' => -1,
	'orderby' => 'title',
	'order' => 'ASC'
));

$caseStudyQuery = new WP_Query(array(
    'post_type' => 'partner',
    'posts_per_page' => 1,
    'meta_key' => 'studycase',
    'meta_value' => true,
	'orderby' => 'title',
	'order' => 'ASC'
));

get_header(); ?>

	<?php if ( have_posts() ) : the_post(); ?>

		<?php get_template_part('includes/header-page'); ?>

		<section>
            <div class='container wrapper-customers'>
                <?php if( $refQuery->have_posts() ) : $count = 0; $countNb = 0; ?>
                    <h2 class='h1 small-margin-bottom'><?php the_title(); ?></h2>
                    <?php the_content(); ?>

					<?php $cats = get_terms('partner_cat'); if( $cats ) : ?>
					<ul id='partners-cat' class='resources-cats partners-cat'>
						<li><button data-cat="all" class='on'><svg class="icon"><use xlink:href="#icon-all"></use></svg><span>Tous</span></button></li>
						<?php foreach( $cats as $cat ) :
							echo '<li><button data-cat="' . $cat->slug . '"><svg class="icon"><use xlink:href="#icon-' . get_field('icon', 'resource_cat_' . $cat->term_id) . '"></use></svg><span>' . $cat->name . '</span></button></li>';
						endforeach; ?>
					</ul>
					<?php endif; ?>

                    <ul class='ref-list' id='ref-list'>
                        <?php while( $refQuery->have_posts() ) : $refQuery->the_post(); $count++; ?>
							<?php $terms = get_the_terms( $post->ID, 'partner_cat' ); ?>
                            <li data-cat='<?php if(!empty($terms)) echo $terms[0]->slug; ?>'>
                                <?php $img = wp_get_attachment_image(get_field('logo'), 'medium', '', array('alt' => get_the_title())); ?>
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
                        <?php endwhile; ?>
                    </ul>
                <?php wp_reset_postdata(); endif; ?>
            </div>
        </section>

        <?php $current_blog_id = get_current_blog_id(); ?>
        <section class="ref-slider js-ref-slider" data-blog-id="<?php echo $current_blog_id ?>" data-type="partner">
            <div class="hexagon-loader js-loader">
                <span class="hexagon"></span>
                <div class="spinner-wrapper">
                    <span class="spinner"></span>
                </div>
            </div>

            <?php if ($caseStudyQuery->have_posts()) :?>
                <?php while ($caseStudyQuery->have_posts()) : $caseStudyQuery->the_post(); ?>
                    <?php $post_slug = get_post_field('post_name', get_post()); ?>
                    <div class="ref-slide ref-slide-init js-ref-current-slide js-ref-id-<?php the_ID() ?>" data-ref-id="<?php the_ID() ?>" data-ref-slug="<?php echo $post_slug ?>">
                        <?php get_template_part('/includes/reference'); ?>
                    </div>
                <?php endwhile; ?>
                <?php wp_reset_postdata(); ?>
            <?php endif; ?>
        </section>

		<div class="container">

			<?php $form = get_field('form'); if( $form ) : ?>
				<div class="wrapper-partner-form">
					<div class="title">
						<h2 class="h1"><?php echo $form['title']; ?></h2>
						<?php echo $form['text']; ?>
					</div>
					<div class="wrapper-form align-items-form">
						<?php echo do_shortcode($form['shortcode']); ?>
					</div>
				</div>
			<?php endif; ?>

		</div>
		
	<?php endif; ?>

<?php get_footer(); ?>