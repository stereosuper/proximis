<?php get_header(); ?>

<?php if ( have_posts() ) : the_post(); ?>
	<header>

	</header>

	<section class='home-united'>
		<div class='container'>
			<?php if( have_rows('section1') ) : while( have_rows('section1') ) : the_row(); ?>
				<div class='anim'>
					<div class='anim-united'>
						<?php if( have_rows('keywords') ) : while( have_rows('keywords') ) : the_row(); ?>
							<span class='keyword'><?php the_sub_field('word'); ?></span>
						<?php endwhile; endif; ?>
					</div>
				</div>
				<div class='text'>
					<?php the_sub_field('text1'); ?>
					<h1><?php the_title(); ?></h1>
					<?php the_sub_field('text2'); ?>
				</div>
			<?php endwhile; endif; ?>
		</div>
	</section>
	
	<section class='home-solution'>
		<div class='container'>
			<?php if( have_rows('section2') ) : while( have_rows('section2') ) : the_row(); ?>
				<div class='text'>
					<?php the_sub_field('text'); ?>
				</div>
				<div class='benefits'>
					<?php if( have_rows('benefits') ) : ?>
						<ul>
							<?php while( have_rows('benefits') ) : the_row(); ?>
								<li>
									<div class='js-benefit anim' id='<?php the_sub_field('anim'); ?>' data-path='<?php echo get_template_directory_uri() . '/json/' . get_sub_field('anim') . '.json'; ?>'></div>
									<div>
										<h3><?php the_sub_field('title'); ?></h3>
										<p><?php the_sub_field('text'); ?></p>
									</div>
								</li>
							<?php endwhile; ?>
						</ul>
					<?php endif; ?>
				</div<h3>
			<?php endwhile; endif; ?>
		</div>
	</section>

	<section class='home-refs'>
		<div class='container'>
			<?php if( have_rows('section3') ) : while( have_rows('section3') ) : the_row(); ?>
				<h2><?php the_sub_field('title'); ?></h2>
				<?php the_sub_field('text'); ?>

				<?php $refQuery = new WP_Query(array('post_type' => 'reference', 'posts_per_page' => 10)); if( $refQuery->have_posts() ) : ?>
					<ul class='home-ref-list'>
						<?php while( $refQuery->have_posts() ) : $refQuery->the_post(); ?>
							<li>
								<a href='<?php the_permalink(); ?>' title='<?php the_title(); ?>'>
									<?php echo wp_get_attachment_image(get_field('logo'), 'full', '', array('alt' => get_the_title())); ?>
								</a>
							</li>
						<?php endwhile; ?>
					</ul>
				<?php wp_reset_postdata(); endif; ?>

				<?php $link = get_sub_field('link'); if( $link ) : ?>
					<a href='<?php echo $link['url'] ?>' class='link'>
						<?php echo $link['title']; ?><svg class='icon'><use xlink:href='#icon-arrow'></use></svg>
					</a>
				<?php endif; ?>
			<?php endwhile; endif; ?>
		</div>
	</section>

<?php endif; ?>

<?php get_footer(); ?>