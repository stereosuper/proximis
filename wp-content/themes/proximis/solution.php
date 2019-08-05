<?php
/*
Template Name: Solution
*/

get_header(); ?>

<?php if ( have_posts() ) : the_post(); ?>

	<?php get_template_part('includes/header-page'); ?>

	<?php if( have_rows('numbers') ) : while( have_rows('numbers') ) : the_row(); ?>
		<section>
			<div class='container'>
				<h2><?php the_sub_field('title'); ?></h2>
				<?php if( have_rows('nbs') ) : ?>
					<ul>
						<?php while( have_rows('nbs') ) : the_row(); ?>
							<li>
								<?php the_sub_field('number'); ?>
								<?php the_sub_field('text'); ?>
							</li>
						<?php endwhile; ?>
					</ul>
				<?php endif; ?>
			</div>
		</section>
	<?php endwhile; endif; ?>

	<?php $testimony = get_field('testimony'); if( $testimony ) : ?>
		<section class='container'>
			<blockquote>
				<?php echo $testimony['quote']; ?>
			</blockquote>
			<h2><?php echo $testimony['title']; ?></h2>
			<?php echo $testimony['text']; ?>
			<?php echo $testimony['anim_text']; ?>
		</section>
	<?php endif; ?>

	<?php if( have_rows('technos') ) : while( have_rows('technos') ) : the_row(); ?>
		<section>
			<div class='container'>
				<h2><?php the_sub_field('title'); ?></h2>
				<?php if( have_rows('tech') ) : ?>
					<ul>
						<?php while( have_rows('tech') ) : the_row(); ?>
							<li>
								<?php the_sub_field('text'); ?>
							</li>
						<?php endwhile; ?>
					</ul>
				<?php endif; ?>
			</div>
		</section>
	<?php endwhile; endif; ?>

	<section class='container wrapper-customers'>
		<?php if( have_rows('customers') ) : while( have_rows('customers') ) : the_row(); ?>
			<h2 class='h1 small-margin-bottom'><?php the_sub_field('title'); ?></h2>
			<p><?php the_sub_field('text'); ?></p>

			<?php
				if( have_rows('numbers', 'options') ) : $numbers = [];
					while( have_rows('numbers', 'options') ) : the_row();
						$numbers[] = [get_sub_field('textBottom'), get_sub_field('text'), get_sub_field('number')];
					endwhile;
				endif;
			?>

			<?php $refQuery = new WP_Query(array('post_type' => 'reference', 'posts_per_page' => 10)); if( $refQuery->have_posts() ) : $count = 0; $countNb = 0; ?>
				<ul class='home-ref-list'>
					<?php while( $refQuery->have_posts() ) : $refQuery->the_post(); $count++; ?>
						<li>
							<?php $img = wp_get_attachment_image(get_field('logo'), 'full', '', array('alt' => get_the_title())); ?>

							<?php if( get_field('studycase') ) : ?>
								<a class="ref clickable" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
									<?php echo $img; ?>
								</a>
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

			<?php if( $link = get_sub_field('link') ) : ?>
				<a href='<?php echo $link['url'] ?>' class='link'>
					<span><?php echo $link['title']; ?></span><i></i>
				</a>
			<?php endif; ?>
		<?php endwhile; endif; ?>
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

	<?php get_template_part('includes/footer-page'); ?>
		
<?php endif; ?>

<?php get_footer(); ?>