<?php get_header(); ?>

<article class='container'>

	<?php if ( have_posts() ) : the_post(); ?>

		<h1><?php the_title(); ?></h1>
		
		<?php if( have_rows('datas') ) : ?>
			<?php while( have_rows('datas') ) : the_row(); ?>
				<?php the_sub_field('number'); ?>
				<?php the_sub_field('text'); ?>
			<?php endwhile; ?>
		<?php endif; ?>

		<?php if( get_field('pdf') ) : ?>
			<p><a href='<?php the_field('pdf'); ?>'><?php _e('Télécharger'); ?></a></p>
		<?php endif; ?>

		<?php if( have_rows('awards') ) : ?>
			<div>
				<h3><?php the_field('awards_title'); ?></h3>
				<ul>
					<?php while( have_rows('awards') ) : the_row(); ?>
						<li>
							<h4><?php the_sub_field('name'); ?></h4>
							<time><?php the_sub_field('year'); ?></time>
							<p><?php the_sub_field('text'); ?></p>
						</li>
					<?php endwhile; ?>
				</ul>
			</div>
		<?php endif; ?>

		<?php echo wp_get_attachment_image(get_field('img'), 'medium'); ?>

		<?php the_content(); ?>
		
	<?php endif; ?>

</article>

<?php get_footer(); ?>
