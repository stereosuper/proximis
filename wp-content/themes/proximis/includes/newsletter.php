<div class='newsletter'>
	<div class='text'>
		<h2><?php the_field('title_news', 'options'); ?></h2>
		<p><?php the_field('text_news', 'options'); ?></p>
	</div>
	<?php echo do_shortcode(get_field('shortcode_news', 'options')); ?>
</div>
