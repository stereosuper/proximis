<?php get_header(); ?>

<?php if ( have_posts() ) : the_post(); ?>

	<?php if( have_rows('slides', 'options') ) : ?>
		<header class='carousel' id='slider'>
			<?php $countSlides = 0; while( have_rows('slides', 'options') ) : the_row(); ?>
				<div class='slide' style='background-color:<?php the_sub_field('color'); ?>'>
					<div class='container'>
						<div class='text'>
							<h2 class='title'>
								<?php
									$title1 = get_sub_field('title1');
									if( $title1 ){ 
										$title1 = get_sub_field('title1quote') ? '<q>' . $title1 . '</q>' : '<span>' . $title1 . '</span>';
										echo $title1;
									}
									$title2 = get_sub_field('title2');
									if( $title2 ){ 
										$title2 = get_sub_field('title2quote') ? '<q>' . $title2 . '</q>' : '<span>' . $title2 . '</span>';
										echo $title2;
									}
									$title3 = get_sub_field('title3');
									if( $title3 ){ 
										$title3 = get_sub_field('title3quote') ? '<q>' . $title3 . '</q>' : '<span>' . $title3 . '</span>';
										echo $title3;
									}
									$title4 = get_sub_field('title4');
									if( $title4 ){ 
										$title4 = get_sub_field('title4quote') ? '<q>' . $title4 . '</q>' : '<span>' . $title4 . '</span>';
										echo $title4;
									}
								?>
							</h2>
							<?php the_sub_field('text'); ?>
						</div>
						<div class='img'><?php echo wp_get_attachment_image(get_sub_field('img'), 'large'); ?></div>
						<div class='badge'><svg style='fill:<?php the_sub_field('color'); ?>' class="icon icon-heart"><use xlink:href="#icon-heart"></use></svg><span>Unified <strong style='color:<?php the_sub_field('color'); ?>'>commerce</strong></span></div>
					</div>
				</div>
			<?php $countSlides ++; endwhile; ?>

			<?php if( $countSlides > 1 ) : ?>
				<div class='carousel-nav'>
					<?php $i = 0; while( $i < $countSlides ) : ?>
						<div class='<?php echo $i == 0 ? "dot active" : "dot"; ?>'></div>
					<?php $i++; endwhile; ?>
				</div>
			<?php endif; ?>
		</header>
	<?php endif ;?>

	<section class='home-united' id='united'>
		<div class='container'>
			<?php if( have_rows('section1') ) : while( have_rows('section1') ) : the_row(); ?>
				<div class='anim'>
					<div class='anim-united'>
						<svg width="470" height="522" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g opacity=".7" filter="url(#filter0_d)">
								<path d="M210.022 6.522c15.456-8.696 34.5-8.696 49.956 0l170.044 95.661C445.478 110.878 455 126.948 455 144.339v191.322c0 17.391-9.522 33.461-24.978 42.156l-170.044 95.661c-15.456 8.696-34.5 8.696-49.956 0L39.978 377.817C24.522 369.122 15 353.052 15 335.661V144.339c0-17.391 9.522-33.461 24.978-42.156L210.022 6.522z" fill="#F9F6F2"/>
								<path d="M210.512 7.393c15.152-8.524 33.824-8.524 48.976 0l170.043 95.661c15.15 8.523 24.469 24.264 24.469 41.285v191.322c0 17.021-9.319 32.762-24.469 41.285l-170.043 95.661c-15.152 8.524-33.824 8.524-48.976 0L40.469 376.946C25.319 368.423 16 352.682 16 335.661V144.339c0-17.021 9.32-32.762 24.469-41.285l170.043-95.66z" stroke="#fff" stroke-width="2"/>
							</g>
							<g filter="url(#filter1_d)">
								<path d="M205 98.32a60 60 0 0 1 60 0l77.698 44.859a60 60 0 0 1 30 51.962v89.718a60 60 0 0 1-30 51.962L265 381.68a60.005 60.005 0 0 1-60 0l-77.698-44.859a60 60 0 0 1-30-51.962v-89.718a60 60 0 0 1 30-51.962L205 98.32z" fill="#FBFAF8"/>
								<path d="M205.5 99.186a59 59 0 0 1 59 0l77.698 44.86a58.998 58.998 0 0 1 29.5 51.095v89.718a58.998 58.998 0 0 1-29.5 51.095L264.5 380.813a58.997 58.997 0 0 1-59 0l-77.698-44.859a58.998 58.998 0 0 1-29.5-51.095v-89.718a58.998 58.998 0 0 1 29.5-51.095l77.698-44.86z" stroke="#fff" stroke-width="2"/>
							</g>
							<g filter="url(#filter2_d)">
								<path d="M215 188.547a40.002 40.002 0 0 1 40 0l14.56 8.406a40 40 0 0 1 20 34.641v16.812a40 40 0 0 1-20 34.641L255 291.453a40.002 40.002 0 0 1-40 0l-14.56-8.406a40 40 0 0 1-20-34.641v-16.812a40 40 0 0 1 20-34.641l14.56-8.406z" fill="#fff"/>
								<path d="M215.25 188.98a39.5 39.5 0 0 1 39.5 0l14.56 8.406a39.5 39.5 0 0 1 19.75 34.208v16.812a39.5 39.5 0 0 1-19.75 34.208l-14.56 8.406a39.5 39.5 0 0 1-39.5 0l-14.56-8.406a39.5 39.5 0 0 1-19.75-34.208v-16.812a39.5 39.5 0 0 1 19.75-34.208l14.56-8.406z" stroke="#F8F5F1" stroke-opacity=".6"/>
							</g>
							<defs>
								<filter id="filter0_d" x="0" y="0" width="470" height="522" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
									<feFlood flood-opacity="0" result="BackgroundImageFix"/>
									<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
									<feOffset dy="27"/><feGaussianBlur stdDeviation="7.5"/>
									<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"/>
									<feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/>
									<feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
								</filter>
								<filter id="filter1_d" x="82.302" y="90.282" width="305.396" height="341.436" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
									<feFlood flood-opacity="0" result="BackgroundImageFix"/>
									<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
									<feOffset dy="27"/>
									<feGaussianBlur stdDeviation="7.5"/>
									<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"/>
									<feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/>
									<feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
								</filter>
								<filter id="filter2_d" x="165.44" y="183.188" width="139.119" height="155.624" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
									<feFlood flood-opacity="0" result="BackgroundImageFix"/>
									<feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
									<feOffset dy="27"/>
									<feGaussianBlur stdDeviation="7.5"/>
									<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
									<feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/>
									<feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
								</filter>
							</defs>
						</svg>
						<?php if( have_rows('keywords') ) : while( have_rows('keywords') ) : the_row(); ?>
							<span class='keyword js-word'><?php the_sub_field('word'); ?></span>
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
									<div class='js-lottie lottie' id='<?php the_sub_field('anim'); ?>' data-path='<?php echo get_template_directory_uri() . '/json/' . get_sub_field('anim') . '.json'; ?>'></div>
									<div>
										<h3><?php the_sub_field('title'); ?></h3>
										<p><?php the_sub_field('text'); ?></p>
									</div>
								</li>
							<?php endwhile; ?>
						</ul>
					<?php endif; ?>
				</div>
			<?php endwhile; endif; ?>
		</div>
	</section>

	<section class='home-refs'>
		<div class='container'>
			<?php if( have_rows('section3') ) : while( have_rows('section3') ) : the_row(); ?>
				<h2><?php the_sub_field('title'); ?></h2>
				<p><?php the_sub_field('text'); ?></p>

				<?php
					$customer_page = get_sub_field('customers_page_link');
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
								<?php
								$img = wp_get_attachment_image(get_field('logo'), 'medium', '', array('alt' => get_the_title()));
								$post_slug = get_post_field('post_name', get_post());
								$permalink = $customer_page .'#'. $post_slug;
								?>

								<?php if( get_field('studycase') ) : ?>
									<a class="ref clickable" href="<?php echo $permalink; ?>" title="<?php the_title(); ?>">
										<span class="btn-hexagon small">
                                            <span class="hexagon"></span>
                                            <span class="plus"></span>
                                        </span>
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
		</div>
	</section>

	<?php 
		$display = get_field('display_they_talk_about_us');
		if ($display && have_rows('they_talk_about_us')):
	?>
	<section class="wrapper-related">
		<div class="container">
		<?php while (have_rows('they_talk_about_us')): the_row(); ?>
			<?php if ($they_talk_about_us_title = get_sub_field('they_talk_about_us_title')): ?>
				<h2 class="x-small alter-font"><?php echo $they_talk_about_us_title ?></h2>
				<?php if (have_rows('they_talk_about_us_items')): ?>
				<ul class="related">
				<?php while (have_rows('they_talk_about_us_items')): the_row();
					$logo = get_sub_field('logo');
					$website_link = get_sub_field('website_link');
					$title = get_sub_field('title');
					$text = get_sub_field('text');
					$post_reference_link = get_sub_field('post_reference_link');
					$post_reference_date = get_sub_field('post_reference_date');
				?>
					<li>
						<header class="post-head">
							<?php if ($website_link): ?>
								<a class="logo-link" href="<?php echo $website_link['url'] ?>" title="<?php echo htmlspecialchars(strip_tags($website_link['title']), ENT_QUOTES); ?>" target="<?php echo $website_link['target'] ?>" <?php echo $website_link['target'] === '_blank' ? 'rel="noopener noreferrer"' : ''; ?>>
									<span class="img"><?php
									if ($logo) {
										echo wp_get_attachment_image($logo['ID'], 'full'); 
									} 
									?></span>
									<span><?php echo $website_link['title'] ?></span>
								</a>
							<?php endif; ?>
							<?php if ($post_reference_date): ?>
								<time class="related-date"><?php echo $post_reference_date ?></time>
							<?php endif; ?>
						</header>
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
						<a class="link" href="<?php echo $post_reference_link['url'] ?>" title="<?php echo htmlspecialchars(strip_tags($post_reference_link['title']), ENT_QUOTES); ?>" target="<?php echo $post_reference_link['target'] ?>" <?php echo $post_reference_link['target'] === '_blank' ? 'rel="noopener noreferrer"' : ''; ?>>
							<span><?php echo $post_reference_link['title'] ?></span><i></i>
						</a>
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