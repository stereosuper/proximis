<?php

/**
 * Button Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'button-' . $block['id'];
if( !empty($block['anchor']) ){
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'btn';
if( !empty($block['className']) ){
    $className .= ' ' . $block['className'];
}

// Load values and assing defaults.
$title = get_field('link')['title'] ?: 'Votre texte...';
$url = get_field('link')['url'] ?: 'http://';

?>
<div class="align<?php echo $block['align']; ?>">
    <a id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>" href="<?php echo $url ?>">
        <?php echo $title ?>
    </a>
</div>