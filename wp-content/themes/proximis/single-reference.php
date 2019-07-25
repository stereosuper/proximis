<?php get_header(); ?>

<article class='container'>
	<div class='container-small'>
		<?php if ( have_posts() ) : the_post(); ?>

			<div class='infos-datas'>
				<h1 class='title-ref'><?php the_title(); ?></h1>
				
				<?php if( have_rows('datas') ) : ?>
					<?php while( have_rows('datas') ) : the_row(); ?>
						<div class='wrapper-data'>
							<div class='data-number'><span><?php the_sub_field('number'); ?></span></div>
							<p class='data-text'><?php the_sub_field('text'); ?></p>
						</div>
					<?php endwhile; ?>
				<?php endif; ?>
			</div>

			<?php if( get_field('pdf') ) : ?>
				<p><a href='<?php the_field('pdf'); ?>'><?php _e('Télécharger'); ?></a></p>
			<?php endif; ?>

			<?php echo wp_get_attachment_image(get_field('img'), 'medium'); ?>

			<?php the_content(); ?>

			<div class='wrapper-results-awards'>
				<?php if( have_rows('results') ) : ?>
					<div class='results'>
						<?php while( have_rows('results') ) : the_row(); ?>
							<h3><?php the_sub_field('results_title'); ?></h3>
							<?php the_sub_field('results_text') ?>
						<?php endwhile; ?>
					</div>
				<?php endif; ?>
				<?php if( have_rows('awards') ) : ?>
					<div class='awards'>
						<h3><?php the_field('awards_title'); ?></h3>
						<ul>
							<?php while( have_rows('awards') ) : the_row(); ?>
								<li>
									<h4 class='award-name'><?php the_sub_field('name'); ?></h4>
									<time class='award-year'><?php the_sub_field('year'); ?></time>
									<p class='award-desc'><?php the_sub_field('text'); ?></p>
								</li>
							<?php endwhile; ?>
						</ul>
					</div>
				<?php endif; ?>
			</div>
			
		<?php endif; ?>
	</div>

</article>

<?php get_footer(); ?>
