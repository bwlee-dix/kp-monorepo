<template>
  <div class="section">
    <div class="container">
      <!--Title-->
      <div class="py-6 section-title has-text-centered">
        <h2 class="title is-2">About Us</h2>
        <h4>Let us tell you the hole story.</h4>
      </div>

      <div class="py-12 video-section">
        <div class="columns is-vcentered">
          <div class="column is-6 is-relative is-centered-portrait">
            <!--Video PLayer-->
            <VPlyr
              ratio="square"
              title="Lorem ipsum dolor sit amet"
              source="https://www.youtube.com/embed/lE5VNpP8JqA?modestbranding=1&rel=0&showinfo=0"
              poster="/video/poster-1c.jpg"
              reversed
              embed
            />
          </div>
          <div class="column is-6">
            <!--Content-->
            <div class="columns is-multiline b-columns-half-tablet-p">
              <div class="column is-6">
                <div class="py-2 medium:py-4">
                  <h4 class="title is-5 is-narrow">How we started</h4>
                  <p class="pt-2 max-w-3 text-medium">
                    We began with a simple idea: make development easier and more
                    accessible for everyone. What started as a small toolkit has grown
                    into a complete platform.
                  </p>
                </div>
              </div>
              <div class="column is-6">
                <div class="py-2 medium:py-4">
                  <h4 class="title is-5 is-narrow">Who we are</h4>
                  <p class="pt-2 max-w-3 text-medium">
                    We provide developers with APIs, tools, and dashboards to build,
                    launch, and manage projects faster. From authentication to storage,
                    everything is integrated.
                  </p>
                </div>
              </div>
              <div class="column is-6">
                <div class="py-2 medium:py-4">
                  <h4 class="title is-5 is-narrow">What we do</h4>
                  <p class="pt-2 max-w-3 text-medium">
                    We are builders, designers, and creators passionate about empowering
                    developers. Our team is dedicated to turning ideas into beautiful,
                    scalable solutions.
                  </p>
                </div>
              </div>
              <div class="column is-6">
                <div class="py-2 medium:py-4">
                  <h4 class="title is-5 is-narrow">Our values</h4>
                  <p class="pt-2 max-w-3 text-medium">
                    Innovation, openness, and community. We believe in rewarding
                    creativity, simplifying workflows, and growing together through
                    collaboration and tokens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
