<?php
/*
Template Name: Sitemap
*/
get_header(); ?>

<div class='container'>

	<?php if ( have_posts() ) : the_post(); ?>
		<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

		<h1><?php the_title(); ?></h1>

		<div class='container-tiny'>
			<?php the_content(); ?>

			<h2><?php _e('Pages'); ?></h2>
			<ul>
				<?php wp_list_pages( array('post_type' => 'page', 'title_li' => '', 'sort_column' => 'post_title') ); ?>
			</ul>

			<?php
				function listPosts($postType, $tax){
					$options = $tax ? array( array('taxonomy' => 'types', 'field' => 'slug', 'terms' => $tax) ) : '';
					$posts = get_posts( array('post_type' => $postType, 'orderby' => 'title', 'posts_per_page' => -1, 'order' => 'ASC', 'tax_query' => $options) );

					if(!$posts) echo '<p>' . __('Nothing was found') . '</p>';

					$output = "<ul>";
					foreach( $posts as $post ){
						$output .= '<li>';
						$output .= '<a href="'. get_permalink($post->ID) .'" title="Go to '. get_the_title($post->ID) .'">';
						$output .= get_the_title($post->ID);
						$output .= '</a>';
						$output .= '</li>';
					}
					$output .= '</ul>';

					echo $output;
				}
			?>

			<h2><?php _e('Blog posts'); ?></h2>
			<?php listPosts('post', ''); ?>
		</div>

	<?php endif; ?>

</div>

<?php get_footer(); ?>
