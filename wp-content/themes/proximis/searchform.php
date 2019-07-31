<form class='search-form no-focus' id='searchform' role='search' method='get' action='<?php echo esc_url( home_url( '/' ) ); ?>'>
	<div class="content-search">
		<input class="input-search" type='search' name='s' value='<?php the_search_query(); ?>' placeholder='<?php _e('Search...', 'proximis'); ?>'>
		<button class='btn-search' type='submit' id='search'>
			<svg class="icon icon-search"><use xlink:href="#icon-search"></use></svg>
			<span class="visually-hidden" id="search"><?php _e('Search', 'proximis'); ?></span>
		</button>
	</div>
</form>