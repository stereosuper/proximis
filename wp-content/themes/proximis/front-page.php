<?php get_header(); ?>

<?php if ( have_posts() ) : the_post(); ?>

	<?php $header = get_field('header'); if($header) : ?>
		<header class="home-header" style="background-image:url(<?php the_post_thumbnail_url('full'); ?>)">
			<div class="container">
				<h1 class="home-title">
					<span><?php echo $header['title1']; ?></span>
					<?php echo $header['title2']; ?>
				</h1>

				<p><?php echo $header['text']; ?></p>

				<?php if($header['btn']): ?>
					<p>
						<a href="<?php echo $header['btn']['url']; ?>" class="btn">
							<?php echo $header['btn']['title']; ?>
						</a>
					</p>
				<?php endif; ?>
			</div>
		</header>
	<?php endif; ?>

	<?php $banner = get_field('banner'); if($banner) : ?>
		<section class="home-banner">
			<div class="container">
				<p>
					<?php echo $banner['subtitle']; ?>
					<span class="home-banner-title"><?php echo $banner['title']; ?></span>
				</p>

				<?php if($banner['btn']): ?>
					<p class="home-banner-btn">
						<a href="<?php echo $banner['btn']['url']; ?>" class="btn">
							<?php echo $banner['btn']['title']; ?>
						</a>
					</p>
				<?php endif; ?>
			</div>
		</section>
	<?php endif; ?>
	
	<?php if( have_rows('logos') ) : ?>
		<section class="bg-white" id="infinite-logos">
			<div class="home-logos-wrapper" id="logos-wrapper">
				<ul class="home-logos" id="logos">
					<?php while( have_rows('logos') ) : the_row(); ?>
						<li>
							<?php echo wp_get_attachment_image(get_sub_field('logo'), 'medium'); ?>
						</li>
					<?php endwhile; ?>
				</ul>
			</div>
		</section>
	<?php endif; ?>

	<?php if( have_rows('slider') ) : while( have_rows('slider') ) : the_row();?>
		<section class="home-carousel bg-white">
			<div class="container">
				<h2 class="h1"><?php the_sub_field('title'); ?></h2>

				<?php if( have_rows('slides') ) : $count = 0; $imgs = []; ?>
					<div class="carousel" id="slider">
						<?php while( have_rows('slides') ) : the_row(); ?>
							<div class="slide js-slide <?php if($count) echo 'hidden'; ?>">
								<div class="slide-text">
									<h3 class="h2"><?php the_sub_field('title'); ?></h3>
									<?php the_sub_field('text'); ?>

									<p class="slide-btn">
										<?php if( $btn1 = get_sub_field('btn1') ): ?>
											<a href="<?php echo $btn1['url']; ?>" class="btn">
												<?php echo $btn1['title']; ?>
											</a>
										<?php endif; ?>

										<?php if( $btn2 = get_sub_field('btn2') ): ?>
											<a href="<?php echo $btn2['url']; ?>" class="btn">
												<?php echo $btn2['title']; ?>
											</a>
										<?php endif; ?>
									</p>
								</div>
								
								<div class="slide-img">
									<?php $imgs[$count] = get_sub_field('img'); echo wp_get_attachment_image($imgs[$count], 'large', false, array('class' => 'skip-lazy')); ?>
									<div class='badge'>
										<svg class="icon icon-heart"><use xlink:href="#icon-heart"></use></svg>
										<span>Unified <strong>commerce</strong></span>
									</div>
								</div>
							</div>
						<?php $count++; endwhile; ?>

						<div id="slide" class="slide hidden">
							<div class="slide-text">
								<div id="slide-text"></div>
								<ul class="carousel-nav" id="slide-nav">
									<?php for($i = 0; $i < $count; $i++){ ?>
										<li><button type="button" data-slide="<?php echo $i; ?>"><?php echo wp_get_attachment_image($imgs[$i]); ?></button></li>
									<?php } ?>
								</ul>
							</div>
							<div class="slide-img" id="slide-img"></div>
						</div>
					</div>
				<?php endif; ?>
			</div>
		</section>
	<?php endwhile; endif; ?>

	<?php if( have_rows('benefits') ) : while( have_rows('benefits') ) : the_row();?>
		<section class="home-benefits">
			<div class="container">
				<h2 class="h1"><?php the_sub_field('title'); ?></h2>
				<p><?php the_sub_field('text'); ?></p>

				<?php $linkText = get_sub_field('link_text'); if( have_rows('cards') ) : ?>
					<ul class="home-cards">
						<?php while( have_rows('cards') ) : the_row(); ?>
							<li class="home-card">
								<a href="<?php the_sub_field('link'); ?>">
									<?php echo wp_get_attachment_image(get_sub_field('img')); ?>
									<h3><?php the_sub_field('text'); ?></h3>
									<span class="link">
										<span><?php echo $linkText; ?></span>
										<i></i>
									</span>
								</a>
							</li>
						<?php endwhile; ?>
					</ul>
				<?php endif; ?>

				<?php if($btn = get_sub_field('btn')): ?>
					<div class="home-benefits-btn">
						<a href="<?php echo $btn['url']; ?>" class="btn white">
							<?php echo $btn['title']; ?>
						</a>
					</div>
				<?php endif; ?>
			</div>
		</section>
	<?php endwhile; endif; ?>

	<?php if( have_rows('clients') ) : while( have_rows('clients') ) : the_row();?>
		<section class="home-clients">
			<div class="container">
				<h2 class="h1"><?php the_sub_field('title'); ?></h2>

				<?php $linkText = get_sub_field('link_text'); if( have_rows('studies') ) : ?>
					<ul class="home-studies">
						<?php while( have_rows('studies') ) : the_row(); $study = get_sub_field('study'); ?>
							<li class="home-study">
								<a href="<?php echo get_the_permalink($study[0]); ?>" title="<?php echo get_the_title($study[0]); ?>">
									<div class="home-study-img" style="background-image:url(<?php the_sub_field('img'); ?>)"></div>
									<div class="home-study-text">
										<div class="home-study-logo">
											<?php echo wp_get_attachment_image(get_field('logo', $study[0]), 'medium'); ?>
										</div>
										<blockquote class="home-study-quote">
											<p>
												<?php the_sub_field('quote'); ?>
											</p>
										</blockquote>
										<span class="link">
											<span><?php echo $linkText; ?></span>
											<i></i>
										</span>
									</div>
								</a>
							</li>
						<?php endwhile; ?>
					</ul>
				<?php endif; ?>

				<?php if($btn = get_sub_field('btn')): ?>
					<a href="<?php echo $btn['url']; ?>" class="btn">
						<?php echo $btn['title']; ?>
					</a>
				<?php endif; ?>
			</div>
		</section>
	<?php endwhile; endif; ?>

	<?php if (have_rows('they_talk_about_us')): ?>
		<section class="wrapper-related">
			<div class="container">
			<?php while (have_rows('they_talk_about_us')): the_row(); ?>
				<?php if ($title = get_sub_field('they_talk_about_us_title')): ?>
					<h2><?php echo $title ?></h2>
					<?php if (have_rows('they_talk_about_us_items')): ?>
					<ul class="related">
					<?php while (have_rows('they_talk_about_us_items')): the_row();
						$logo = get_sub_field('logo');
						$cover = get_sub_field('cover');
						$website_link = get_sub_field('website_link');
						$title = get_sub_field('title');
						$text = get_sub_field('text');
						$post_reference_link = get_sub_field('post_reference_link');
					?>
						<li>
							<?php if ($cover || $logo) : ?>
								<header class="post-head">
									<?php if ($website_link): ?>
										<a class="logo-link-home" href="<?php echo $website_link['url'] ?>" title="<?php echo htmlspecialchars(strip_tags($website_link['title']), ENT_QUOTES); ?>" target="<?php echo $website_link['target'] ?>" <?php echo $website_link['target'] === '_blank' ? 'rel="noopener noreferrer"' : ''; ?>>
											<?php if ($cover) : ?>
												<div class='cover' style='background-image:url(<?php echo wp_get_attachment_image_url($cover, 'full'); ?>)'></div>
											<?php elseif ($logo) : echo wp_get_attachment_image($logo['ID'], 'full'); endif; ?>
										</a>
									<?php endif; ?>
								</header>
							<?php endif; ?>
							<?php if ($title): ?>
								<h3 class="related-title">
									<a class="link" href="<?php echo $post_reference_link['url'] ?>" title="<?php echo htmlspecialchars(strip_tags($post_reference_link['title']), ENT_QUOTES); ?>" target="<?php echo $post_reference_link['target'] ?>" <?php echo $post_reference_link['target'] === '_blank' ? 'rel="noopener noreferrer"' : ''; ?>>
										<?php echo $title ?>
									</a>
								</h3>
							<?php endif; ?>
							<?php if ($text): ?>
								<?php echo force_balance_tags(html_entity_decode(wp_trim_words(htmlentities(wpautop($text)), 17))) ?>
							<?php endif; ?>
							<?php if($post_reference_link) : ?>
								<a class="link small" href="<?php echo $post_reference_link['url'] ?>" title="<?php echo htmlspecialchars(strip_tags($post_reference_link['title']), ENT_QUOTES); ?>" target="<?php echo $post_reference_link['target'] ?>" <?php echo $post_reference_link['target'] === '_blank' ? 'rel="noopener noreferrer"' : ''; ?>>
									<span><?php echo $post_reference_link['title'] ?></span><i></i>
								</a>
							<?php endif; ?>
						</li>
					<?php endwhile; ?>
					</ul>
					<?php endif; ?>
				<?php endif; ?>
			<?php endwhile; ?>
			</div>
		</section>
	<?php endif; ?>

<?php endif; ?>

<?php get_footer(); ?>