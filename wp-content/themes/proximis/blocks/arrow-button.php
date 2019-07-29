<?php

/**
 * Highlighted Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'button-arrow-' . $block['id'];
if( !empty($block['anchor']) ){
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'button-arrow link';
if( !empty($block['className']) ){
    $className .= ' ' . $block['className'];
}
// if( !empty($block['align']) ) {
//     $className .= ' align' . $block['align'];
// }

// Load values and assing defaults.
$title = get_field('link')['title'] ?: 'Votre texte mis en avant...';
$url = get_field('link')['url'] ?: 'Votre texte mis en avant...';

?>
<a id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>" href="<?php echo $url ?>">
    <span><?php echo $title ?></span><i></i>
</a>