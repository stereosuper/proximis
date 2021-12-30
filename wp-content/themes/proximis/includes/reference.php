<article class="container-ref">
    <div class="container">
        <div class="wrapper-btn-infos" id="btn-infos">
            <div class="content-btn-infos js-content-btn-infos">
                <div class="nav-btn nav-hidden js-nav-btn">
                    <button type="button" class="btn-hexagon animated js-button-hexagon">
                        <span class="hexagon"></span>
                        <svg class="icon icon-small-arrow prev"><use xlink:href="#icon-small-arrow"></use></svg>
                    </button>
                    <button type="button" class="btn-hexagon animated js-button-hexagon">
                        <span class="hexagon"></span>
                        <svg class="icon icon-small-arrow next"><use xlink:href="#icon-small-arrow"></use></svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="ref-content-wrapper">
            <div class="ref-logo">
                <?php echo wp_get_attachment_image(get_field('logo'), 'medium', '', array('alt' => get_the_title())); ?>
            </div>
            <?php the_content(); ?>
        </div>
    </div>
</article>