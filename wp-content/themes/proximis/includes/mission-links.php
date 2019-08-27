<?php if( have_rows('links') ) : ?>
	<p class='mission-title'><?php _e('For further information...', 'proximis'); ?></p>
	<div class='mission-links'>
		<?php while( have_rows('links') ) : the_row(); ?>
			<?php $link = get_sub_field('link'); ?>
			<a href='<?php echo $link['url']; ?>' class='mission-link' target='_blank' rel='noreferrer noopener'>
				<span class='sup-title'><?php the_sub_field('cat'); ?></span>
				<span class='title'><?php the_sub_field('title'); ?></span>
				<span class='link small'>
					<span><?php echo $link['title']; ?></span><i></i>
				</span>
			</a>
		<?php endwhile; ?>
	</div>
<?php endif; ?>
