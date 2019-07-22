<?php get_header(); ?>

<article class='container'>

	<?php if ( have_posts() ) : the_post(); ?>

		<h1><?php the_title(); ?></h1>
		
		<?php if( have_rows('datas') ) : ?>
			<?php while( have_rows('datas') ) : the_row(); ?>
				<?php the_sub_field('number'); ?>
				<?php the_sub_field('name'); ?>
			<?php endwhile; ?>
		<?php endif; ?>

		<?php the_content(); ?>
		
	<?php endif; ?>

</article>

<?php get_footer(); ?>
