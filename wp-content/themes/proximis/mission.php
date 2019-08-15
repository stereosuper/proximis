<?php
/*
Template Name: Mission
*/

get_header(); ?>

<?php if ( have_posts() ) : the_post(); ?>

	<?php get_template_part('includes/header-page'); ?>

	<div class='container mission'>
		<?php if( have_rows('section1') ) : while( have_rows('section1') ) : the_row(); ?>
			<section class='mission-section'>
				<div class='container-tiny'>
					<h2><?php the_sub_field('title'); ?></h2>
					<div class='big-text'><?php the_sub_field('text'); ?></div>
					<div class='cols-text'><?php the_sub_field('columns'); ?></div>
				</div>
				<?php if( have_rows('examples') ) : ?>
					<div class='examples'>
						<?php while( have_rows('examples') ) : the_row(); ?>
							<div class='example clearfix'>
								<h3><?php the_sub_field('title'); ?></h3>
								<?php
									$img = wp_get_attachment_image_url(get_sub_field('img'), 'medium');
									echo wp_get_attachment_image(get_sub_field('img'), 'medium', false, array('class' => 'img-shape', 'style' => 'shape-outside:url(' . $img . ')'));
								?>
								<p><?php the_sub_field('text'); ?></p>
							</div>
						<?php endwhile; ?>
					</div>
				<?php endif; ?>
				<div class='container-tiny'>
					<?php the_sub_field('text2'); ?>
					<?php if( have_rows('links') ) : ?>
						<p class='mission-title'><?php _e('For further information...', 'proximis'); ?></p>
						<div class='mission-links'>
							<?php while( have_rows('links') ) : the_row(); ?>
								<?php $link = get_sub_field('link'); ?>
								<a href='<?php echo $link['url']; ?>' class='mission-link'>
									<span class='sup-title'><?php the_sub_field('cat'); ?></span>
									<span class='title'><?php the_sub_field('title'); ?></span>
									<span class='link small'>
										<span><?php echo $link['title']; ?></span><i></i>
									</span>
								</a>
							<?php endwhile; ?>
						</div>
					<?php endif; ?>
				</div>
			</section>
		<?php endwhile; endif; ?>

		<?php if( have_rows('section2') ) : while( have_rows('section2') ) : the_row(); ?>
			<section class='mission-section'>
				<div class='container-tiny'>
					<h2><?php the_sub_field('title'); ?></h2>
					<div class='big-text'><?php the_sub_field('text'); ?></div>
				</div>

				<div class='container-medium'>
					<?php the_sub_field('omnicanal'); ?>
					<?php the_sub_field('united'); ?>
				</div>

				<div class='container-tiny'>
					<?php if( have_rows('links') ) : ?>
						<p class='mission-title'><?php _e('For further information...', 'proximis'); ?></p>
						<div class='mission-links'>
							<?php while( have_rows('links') ) : the_row(); ?>
								<?php $link = get_sub_field('link'); ?>
								<a href='<?php echo $link['url']; ?>' class='mission-link'>
									<span class='sup-title'><?php the_sub_field('cat'); ?></span>
									<span class='title'><?php the_sub_field('title'); ?></span>
									<span class='link small'>
										<span><?php echo $link['title']; ?></span><i></i>
									</span>
								</a>
							<?php endwhile; ?>
						</div>
					<?php endif; ?>
				</div>
			</section>
		<?php endwhile; endif; ?>

		<?php if( have_rows('section3') ) : while( have_rows('section3') ) : the_row(); ?>
			<section class='mission-section'>
				<div class='container-tiny'>
					<h2><?php the_sub_field('title'); ?></h2>
					<div class='big-text'><?php the_sub_field('text'); ?></div>
				</div>

				<div class='container-medium'>
					<?php if( have_rows('cols') ) : ?>
						<div class='mission-cols'>
							<?php while( have_rows('cols') ) : the_row(); ?>
								<div>
									<h3><?php the_sub_field('title'); ?></h3>
									<?php the_sub_field('text'); ?>
								</div>
							<?php endwhile; ?>
						</div>
					<?php endif; ?>
				</div>

				<div class='container-small'>
					<?php $nbTitle = get_sub_field('numbers_title'); if( have_rows('numbers', 'options') ) : ?>
						<div class='mission-numbers'>
							<p class='mission-title'><?php echo $nbTitle; ?></p>
							<div class='mission-nb'>
								<?php while( have_rows('numbers', 'options') ) : the_row();
									$numbers = [get_sub_field('textBottom'), get_sub_field('text'), get_sub_field('number')]; ?>
									<div class='ref number'>
											<div>
												<?php if( $numbers[0] ) : ?>
													<span><?php echo $numbers[1]; ?></span>
												<?php endif; ?>
												<span class='nb'><?php echo $numbers[2]; ?></span>
												<?php if( !$numbers[0] ) : ?>
													<span><?php echo $numbers[1]; ?></span>
												<?php endif; ?>
											</div>
										</div>
								<?php endwhile; ?>
							</div>
						</div>
					<?php endif; ?>
				</div>

				<div class='container-tiny'>
					<?php if( have_rows('links') ) : ?>
						<p class='mission-title'><?php _e('For further information...', 'proximis'); ?></p>
						<div class='mission-links'>
							<?php while( have_rows('links') ) : the_row(); ?>
								<?php $link = get_sub_field('link'); ?>
								<a href='<?php echo $link['url']; ?>' class='mission-link'>
									<span class='sup-title'><?php the_sub_field('cat'); ?></span>
									<span class='title'><?php the_sub_field('title'); ?></span>
									<span class='link small'>
										<span><?php echo $link['title']; ?></span><i></i>
									</span>
								</a>
							<?php endwhile; ?>
						</div>
					<?php endif; ?>
				</div>
			</section>
		<?php endwhile; endif; ?>

		<?php if( have_rows('section4') ) : while( have_rows('section4') ) : the_row(); ?>
			<section class='mission-section'>
				<div class='container-tiny'>
					<h2><?php the_sub_field('title'); ?></h2>
					<div class='big-text'><?php the_sub_field('text'); ?></div>
				</div>
				<?php if( have_rows('examples') ) : ?>
					<div class='examples'>
						<?php while( have_rows('examples') ) : the_row(); ?>
							<div class='example'>
								<h3><?php the_sub_field('title'); ?></h3>
								<p><?php the_sub_field('text'); ?></p>
							</div>
						<?php endwhile; ?>
					</div>
				<?php endif; ?>
				<div class='container-tiny'>
					<?php the_sub_field('text2'); ?>
					<?php if( have_rows('links') ) : ?>
						<p class='mission-title'><?php _e('For further information...', 'proximis'); ?></p>
						<div class='mission-links'>
							<?php while( have_rows('links') ) : the_row(); ?>
								<?php $link = get_sub_field('link'); ?>
								<a href='<?php echo $link['url']; ?>' class='mission-link'>
									<span class='sup-title'><?php the_sub_field('cat'); ?></span>
									<span class='title'><?php the_sub_field('title'); ?></span>
									<span class='link small'>
										<span><?php echo $link['title']; ?></span><i></i>
									</span>
								</a>
							<?php endwhile; ?>
						</div>
					<?php endif; ?>
				</div>
			</section>
		<?php endwhile; endif; ?>

		<?php if( have_rows('section5') ) : while( have_rows('section5') ) : the_row(); ?>
			<section class='mission-section'>
				<div class='container-tiny'>
					<h2><?php the_sub_field('title'); ?></h2>
					<div class='big-text'><?php the_sub_field('text'); ?></div>
					<div class='cols-text'><?php the_sub_field('columns'); ?></div>
				</div>
				<div class='container-tiny'>
					<?php if( have_rows('links') ) : ?>
						<p class='mission-title'><?php _e('For further information...', 'proximis'); ?></p>
						<div class='mission-links'>
							<?php while( have_rows('links') ) : the_row(); ?>
								<?php $link = get_sub_field('link'); ?>
								<a href='<?php echo $link['url']; ?>' class='mission-link'>
									<span class='sup-title'><?php the_sub_field('cat'); ?></span>
									<span class='title'><?php the_sub_field('title'); ?></span>
									<span class='link small'>
										<span><?php echo $link['title']; ?></span><i></i>
									</span>
								</a>
							<?php endwhile; ?>
						</div>
					<?php endif; ?>
				</div>
			</section>
		<?php endwhile; endif; ?>

		<?php if( have_rows('section6') ) : while( have_rows('section6') ) : the_row(); ?>
			<section class='mission-section'>
				<div class='container-tiny'>
					<h2><?php the_sub_field('title'); ?></h2>
					<div class='big-text'><?php the_sub_field('text'); ?></div>
					<div class='cols-text'><?php the_sub_field('columns'); ?></div>
				</div>
				<div class='container-tiny'>
					<?php if( have_rows('links') ) : ?>
						<p class='mission-title'><?php _e('For further information...', 'proximis'); ?></p>
						<div class='mission-links'>
							<?php while( have_rows('links') ) : the_row(); ?>
								<?php $link = get_sub_field('link'); ?>
								<a href='<?php echo $link['url']; ?>' class='mission-link'>
									<span class='sup-title'><?php the_sub_field('cat'); ?></span>
									<span class='title'><?php the_sub_field('title'); ?></span>
									<span class='link small'>
										<span><?php echo $link['title']; ?></span><i></i>
									</span>
								</a>
							<?php endwhile; ?>
						</div>
					<?php endif; ?>
				</div>
			</section>
		<?php endwhile; endif; ?>

		<?php if( have_rows('section7') ) : while( have_rows('section7') ) : the_row(); ?>
			<section class='mission-section'>
				<div class='container-tiny'>
					<h2><?php the_sub_field('title'); ?></h2>
					<div class='big-text'><?php the_sub_field('text'); ?></div>
					<?php if( have_rows('steps') ) : ?>
						<ol>
							<?php while( have_rows('steps') ) : the_row(); ?>
								<li>
									<?php the_sub_field('text'); ?>
								</li>
							<?php endwhile; ?>
						</ol>
					<?php endif ?>
				</div>
				<div class='container-tiny'>
					<?php if( have_rows('links') ) : ?>
						<p class='mission-title'><?php _e('For further information...', 'proximis'); ?></p>
						<div class='mission-links'>
							<?php while( have_rows('links') ) : the_row(); ?>
								<?php $link = get_sub_field('link'); ?>
								<a href='<?php echo $link['url']; ?>' class='mission-link'>
									<span class='sup-title'><?php the_sub_field('cat'); ?></span>
									<span class='title'><?php the_sub_field('title'); ?></span>
									<span class='link small'>
										<span><?php echo $link['title']; ?></span><i></i>
									</span>
								</a>
							<?php endwhile; ?>
						</div>
					<?php endif; ?>
				</div>
			</section>
		<?php endwhile; endif; ?>

		<?php if( have_rows('section8') ) : while( have_rows('section8') ) : the_row(); ?>
			<section class='mission-section'>
				<div class='container-tiny'>
					<h2><?php the_sub_field('title'); ?></h2>
					<div class='big-text'><?php the_sub_field('text'); ?></div>
					<div class='cols-text'><?php the_sub_field('columns'); ?></div>
				</div>
				<div class='container-tiny'>
					<?php if( have_rows('links') ) : ?>
						<p class='mission-title'><?php _e('For further information...', 'proximis'); ?></p>
						<div class='mission-links'>
							<?php while( have_rows('links') ) : the_row(); ?>
								<?php $link = get_sub_field('link'); ?>
								<a href='<?php echo $link['url']; ?>' class='mission-link'>
									<span class='sup-title'><?php the_sub_field('cat'); ?></span>
									<span class='title'><?php the_sub_field('title'); ?></span>
									<span class='link small'>
										<span><?php echo $link['title']; ?></span><i></i>
									</span>
								</a>
							<?php endwhile; ?>
						</div>
					<?php endif; ?>
				</div>
			</section>
		<?php endwhile; endif; ?>

		<?php if( have_rows('section9') ) : while( have_rows('section9') ) : the_row(); ?>
			<section class='mission-section'>
				<div class='container-tiny'>
					<h2><?php the_sub_field('title'); ?></h2>
					<div class='big-text'><?php the_sub_field('text'); ?></div>
					<div class='cols-text'><?php the_sub_field('columns'); ?></div>
				</div>
				<div class='container-medium'>
					<?php if( have_rows('articles') ) : ?>
						<?php while( have_rows('articles') ) : the_row(); ?>
							<div>
								<time><?php the_sub_field('date'); ?></time>
								<h3><?php the_sub_field('titre'); ?></h3>
								<p><?php the_sub_field('text'); ?></p>
							</div>
						<?php endwhile; ?>
					<?php endif; ?>
				</div>
				<div class='container-tiny'>
					<?php if( have_rows('links') ) : ?>
						<p class='mission-title'><?php _e('For further information...', 'proximis'); ?></p>
						<div class='mission-links'>
							<?php while( have_rows('links') ) : the_row(); ?>
								<?php $link = get_sub_field('link'); ?>
								<a href='<?php echo $link['url']; ?>' class='mission-link'>
									<span class='sup-title'><?php the_sub_field('cat'); ?></span>
									<span class='title'><?php the_sub_field('title'); ?></span>
									<span class='link small'>
										<span><?php echo $link['title']; ?></span><i></i>
									</span>
								</a>
							<?php endwhile; ?>
						</div>
					<?php endif; ?>
				</div>
			</section>
		<?php endwhile; endif; ?>
	</div>

	<?php get_template_part('includes/footer-page'); ?>
		
<?php endif; ?>

<?php get_footer(); ?>