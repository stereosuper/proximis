<?php

/**
 * Newsletter Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'newsletter-' . $block['id'];
if( !empty($block['anchor']) ){
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'newsletter-highlighted';
if( !empty($block['className']) ){
    $className .= ' ' . $block['className'];
}
// if( !empty($block['align']) ) {
//     $className .= ' align' . $block['align'];
// }

?>
<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>" data-io="highlighted">
    <span class='line'></span>
    <?php get_template_part('includes/newsletter'); ?>
</div>