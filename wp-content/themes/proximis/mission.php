<?php
/*
Template Name: Mission
*/

get_header(); ?>

<?php if ( have_posts() ) : the_post(); ?>

	<?php get_template_part('includes/header-page'); ?>

	<div class='container'>
		<?php if( have_rows('section1') ) : while( have_rows('section1') ) : the_row(); ?>
			<section>
				<h2><?php the_sub_field('title'); ?></h2>
				<?php the_sub_field('text'); ?>
				<?php the_sub_field('columns'); ?>
				<?php if( have_rows('examples') ) : while( have_rows('examples') ) : the_row(); ?>
					<div>
						<?php the_sub_field('title'); ?>
						<?php the_sub_field('text'); ?>
					</div>
				<?php endwhile; endif; ?>
				<?php the_sub_field('text2'); ?>
				<?php if( have_rows('links') ) : while( have_rows('links') ) : the_row(); ?>
					<div>
						<?php the_sub_field('title'); ?>
						<?php the_sub_field('cat'); ?>
					</div>
				<?php endwhile; endif; ?>
			</section>
		<?php endwhile; endif; ?>
	</div>

	<?php get_template_part('includes/footer-page'); ?>
		
<?php endif; ?>

<?php get_footer(); ?>