<?php 
/*
Template Name: Services
*/

get_header(); ?>

<?php if ( have_posts() ) : the_post(); ?>
		
	<?php get_template_part('includes/header-page'); ?>

	<section class='container services'>
		<?php if( have_rows('columns') ) : ?>
			<?php while( have_rows('columns') ) : the_row(); ?>
				<div>
					<div class='js-lottie lottie' id='<?php the_sub_field('anim'); ?>' data-path='<?php echo get_template_directory_uri() . '/json/' . get_sub_field('anim') . '.json'; ?>'></div>
					<h2><?php the_sub_field('title'); ?></h2>
					<?php the_sub_field('text'); ?>
				</div>
			<?php endwhile; ?>
		<?php endif; ?>
	</section>

	<?php get_template_part('includes/footer-page'); ?>
		
<?php endif; ?>

<?php get_footer(); ?>
