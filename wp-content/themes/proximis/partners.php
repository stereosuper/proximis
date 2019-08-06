<?php
/*
Template Name: Partners
*/

get_header(); ?>

<div class='container'>

	<?php if ( have_posts() ) : the_post(); ?>

		<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

		<div class='container-medium'>
			<h1><?php the_title(); ?></h1>
			<?php the_content(); ?>

			<?php if( have_rows('partners') ) : ?>
				<ul>
					<?php while( have_rows('partners') ) : the_row(); ?>
						<li>
							<?php $link = get_sub_field('link'); ?>
							<?php echo wp_get_attachment_image(get_sub_field('name')); ?>
							<?php if( $link ) : ?>
								<a href='<?php echo $link['url']; ?>'><?php echo $link['title']; ?></a>
							<?php endif; ?>
							<?php the_sub_field('name'); ?>
							<?php the_sub_field('text'); ?>
							<?php if( $link ) : ?>
								<a href='<?php echo $link['url']; ?>' class='link'>
									<span><?php _e('Learn more', 'proximis'); ?></span><i></i>
								</a>
							<?php endif; ?>
						</li>
					<?php endwhile; ?>
				</ul>
			<?php endif; ?>

			<?php $form = get_field('form'); if( $form ) : ?>
				<h2><?php echo $form['title']; ?></h2>
				<?php echo $form['text']; ?>
				<?php echo do_shortcode($form['shortcode']); ?>
			<?php endif; ?>
		</div>
		
	<?php endif; ?>

</div>

<?php get_footer(); ?>