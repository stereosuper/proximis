<?php $terms = get_terms('portfolio_category'); ?>
<?php $category_count = count($terms); ?>
	
<?php // Display the category filter, if at least one category exists. ?>
<?php if ($category_count) { ?>					
				
	<ul class="portfolio-filter group">
					
		<li><span class="filter-title"><?php _e( 'Réalisations', 'onioneye' ); ?></span></li>
					
		<?php
		$all_link = '#';
					
		// Find the link to the portfolio page, if the current page isn't the portfolio page itself, or a single portfolio item
		if(!is_page_template('template-portfolio.php') || !is_page_template('single-portfolio.php')) {
			$pages = get_pages(array(
				'meta_key' => '_wp_page_template',
				'meta_value' => 'template-portfolio.php',
				'hierarchical' => 0
			));
			foreach($pages as $page){
				$all_link = get_page_link( $page->ID );
				break;
			}
		}
		?>
						
		<li <?php if(!is_tax() && (is_page_template('template-portfolio.php') || is_page_template('single-portfolio.php'))) { ?>class="active"<?php } ?>>
			<a href="<?php echo $all_link ?>" data-filter="*" class="filter-all group" title="<?php esc_attr_e( 'View all items', 'onioneye' ); ?>">Tout</a>
		</li>
								
		<?php foreach ( $terms as $term ) { ?>
					
			<?php 
				//Always check if it's an error before continuing. get_term_link() can be finicky sometimes
				$term_link = get_term_link( $term, 'portfolio_category' );
							
				if(is_wp_error($term_link))
					continue;
			?>
							
				<li <?php if(get_queried_object()->slug == $term->slug) { ?>class="active"<?php } ?>>
					<a href="<?php echo $term_link ?>" data-filter=".<?php echo $term->slug; ?>" class="filter-<?php echo $term->slug; ?> group">
						<?php echo $term->name; ?>
					</a>
				</li>
															
		<?php } ?>
					
	</ul><!-- /#filter -->
					
<?php } ?>

<?php $categories = get_categories();
if(count($categories)){ ?> 

<ul class="my-filter group">
					
		<li><span class="my-filter-title">Actualités</span></li>

		<li <?php if(is_page( get_option('page_for_posts') )) echo 'class="active"'; ?>>
			<a href="<?php echo get_permalink( get_option('page_for_posts') ); ?>">Tout</a>
		</li>

		<?php foreach ($categories as $category){ ?>

			<li <?php if(is_category($category->slug)) echo 'class="active"'; ?>>
				<a href="<?php echo get_category_link( $category->term_id );  ?>"><?php echo $category->name; ?></a>
			</li>

		<?php } ?> 
</ul>
<?php } ?>

<?php $atelierCats = get_terms('atelier_cat');
if(count($atelierCats)){ ?> 

<ul class="my-filter group">
					
		<li><span class="my-filter-title">Ateliers</span></li>

		<?php
		$all_link = '#';

		// Find the link to the portfolio page, if the current page isn't the portfolio page itself, or a single portfolio item
		if(!is_page_template('ateliers.php') || !is_page_template('single-atelier.php')) {
			$pages = get_pages(array(
				'meta_key' => '_wp_page_template',
				'meta_value' => 'ateliers.php',
				'hierarchical' => 0
			));
			foreach($pages as $page){
				$all_link = get_page_link( $page->ID );
				break;
			}
		}
		?>

		<li <?php if(!is_tax() && (is_page_template('ateliers.php') || is_page_template('single-atelier.php'))) { ?>class="active"<?php } ?>>
			<a href="<?php echo $all_link ?>" data-filter="*" class="filter-all group" title="<?php esc_attr_e( 'View all items', 'onioneye' ); ?>">Tout</a>
		</li>

		<?php foreach ( $atelierCats as $term ) { ?>

			<?php 
				//Always check if it's an error before continuing. get_term_link() can be finicky sometimes
				$term_link = get_term_link( $term, 'portfolio_category' );

				if(is_wp_error($term_link))
					continue;
			?>

				<li <?php if(get_queried_object()->slug == $term->slug) { ?>class="active"<?php } ?>>
					<a href="<?php echo $term_link ?>" data-filter=".<?php echo $term->slug; ?>" class="filter-<?php echo $term->slug; ?> group">
						<?php echo $term->name; ?>
					</a>
				</li>

		<?php } ?>
</ul>
<?php } ?>
