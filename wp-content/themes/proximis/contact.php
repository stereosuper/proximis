<?php 
/*
Template Name: Contact
*/

get_header(); ?>

<div class='container'>

	<?php if ( have_posts() ) : the_post(); ?>
		
		<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

		<div class='container-medium'>

			<h1><?php the_title(); ?></h1>

			<div class='contact-content'>
				<div class='contact-form'>
					<?php the_content(); ?>
					<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
					<script>
						// Pseudo-jQuery for Hubspot callbacks
						// https://www.unstack.com/blog/hubspot-on-form-submit-callbacks-without-jquery
						(function() {
							window.jQuery = window.jQuery || function(nodeOrSelector) {
								if (typeof(nodeOrSelector) == 'string') {
									return document.querySelector(s);
								}
								return nodeOrSelector;
							};
						})();
					</script>
					<?php if( mlp_get_current_blog_language(true) == 'en' ){ ?>
						<script>
						hbspt.forms.create({
							portalId: "2906533",
							formId: "2cf680f4-54c0-4f04-9d95-6ec1f370267b",
							onFormSubmitted: function(){
								gtag('event', 'formulaire', {'event_category': 'contact', 'event_label': 'page-contact'});
							}
						});
						</script>
					<?php }else if( mlp_get_current_blog_language(true) == 'es' ){ ?>
						<script>
						hbspt.forms.create({
							portalId: "2906533",
							formId: "dcc62e1b-b2a0-43e3-bab8-1be57fd3dcd5",
							onFormSubmitted: function(){
								gtag('event', 'formulaire', {'event_category': 'contact', 'event_label': 'page-contact'});
							}
						});
						</script>
					<?php }else{ ?>
						<script>
							hbspt.forms.create({
								portalId: "2906533",
								formId: "fd55dfa8-6717-4be8-ac3f-e094d25b79ab",
								onFormSubmitted: function(){
									gtag('event', 'formulaire', {'event_category': 'contact', 'event_label': 'page-contact'});
								}
							});
						</script>
					<?php } ?>
					
				</div>
				<div class='contact-infos'>
					<?php if(have_rows('contact_infos')): ?>
						<?php while( have_rows('contact_infos') ) : the_row(); ?>
							<div class='infos'>
								<h2><?php the_sub_field('title'); ?></h2>
								<?php $address = get_sub_field('address'); if( $address ) : ?>
									<h3><?php echo $address['title']; ?></h3>
									<p>
										<?php if( $address['link'] ) : ?>
											<a href='<?php echo $address['link']; ?>'>
												<?php echo $address['text']; ?>
											</a>
										<?php else : echo $address['text']; endif; ?>
									</p>
								<?php endif; ?>
								<?php $infos = get_sub_field('infos'); if( $infos ) : ?>
									<h3><?php echo $infos['title']; ?></h3>
									<p>
										<?php if( $infos['tel'] ) : ?>
											<span class='display-tel'>
												<button class='simple-link'>
													<?php the_field('tel_btn'); ?>
												</button>
												<span class='tel hidden'>
													<?php if( $infos['link_tel'] ) : ?>
														<a href='<?php echo $infos['link_tel']; ?>'>
															<?php echo $infos['tel']; ?>
														</a>
													<?php else : echo $infos['tel']; endif; ?>
												</span>
											</span>
										<?php endif; ?>
										<br>
										<?php if( $infos['link_mail'] ) : ?>
											<a href='<?php echo $infos['link_mail']; ?>'>
												<?php echo $infos['mail']; ?>
											</a>
										<?php else : echo $infos['mail']; endif; ?>
									</p>
								<?php endif; ?>
							</div>
						<?php endwhile; ?>
					<?php endif; ?>

					<div>
						<?php $applications = get_field('applications'); if( $applications ) : ?>
							<?php if( $applications['img'] ) echo wp_get_attachment_image($applications['img'], 'full'); ?>
							<div>
								<h2><?php echo $applications['title']; ?></h2>
								<p id='mailto-recruitment'>
									<?php echo $applications['text']; ?>
									<br>
									<?php if( $applications['link'] ) : ?>
										<a href='<?php echo $applications['link']; ?>'>
											<?php echo $applications['mail']; ?>
										</a>
									<?php else : echo $applications['mail']; endif; ?>
								</p>
							</div>
						<?php endif; ?>
					</div>
				</div>
			</div>

		</div>

		<!--<i class='hidden' id='valid-msg'><?php //_e('We will get back to you soon.', 'proximis'); ?></i>
		<i class='hidden' id='valid-link'><?php //_e('Send a new message', 'proximis'); ?></i>-->
		
	<?php endif; ?>

</div>

<?php get_footer(); ?>
