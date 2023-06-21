<template>
  <div class="mermaid-container">
    <div :style="style" class="mermaid" ref="mermaid"></div>
  </div>
</template>

<script>
export default {
  props: {
    graph: String,
    minWidth: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      inited: false,
    }
  },
  computed: {
    style() {
      const { minWidth } = this
      return {
        minWidth: `${minWidth}px`,
      }
    },
  },
  mounted() {
    import("mermaid/dist/mermaid").then((m) => {
      m.parseError = function (err, hash) {
        console.error(err)
      }
      m.initialize({
        securityLevel: "loose",
        flowchart: {
          useMaxWidth: false,
          nodeSpacing: 5,
          //  rankSpacing: 60
        },
        er: {
          diagramPadding: 50,
        },
        theme: "base",
        themeVariables: {
          primaryColor: "#ffffff",
          primaryBorderColor: "var(--c-brand)",
        },
        themeCSS: `
					.edgePath .path {
						stroke: var(--c-brand);
					}
					.edgePath .arrowheadPath{
						fill: var(--c-brand);
					}

					.label {
						color: var(--c-text);
					}

					.edgeLabel {
						background-color: var(--c-bg-light);
					}

					.edgeLabel span{
						color: var(--c-text)
					}

					.edgeLabel rect {
						background-color: var(--c-bg-light);
						fill: var(--c-bg-light);
					}

					.node rect,
					.node polygon {
						stroke: var(--c-brand);
						fill: var(--c-bg)
					}

					.cluster rect {
						stroke: var(--c-brand);
						fill: var(--c-brand);
						fill-opacity: 0.1;
					}

					.cluster .label {
						color: var(--c-brand);
					}

					.messageLine1, .messageLine0 {
						stroke: var(--c-brand);
					}

					rect.actor {
						fill: var(--c-bg);
						stroke: var(--c-brand);
					}

					text.actor>tspan {
						fill: var(--c-text);
					}

          .actor-man circle {
            fill: var(--c-bg);
          }

					.messageText {
						fill: var(--c-text);
					}

					#arrowhead>path {
						stroke: var(--c-brand);
						fill: var(--c-brand);
					}
          rect.rect {
						fill: var(--c-brand);
            fill-opacity: 0.1;
          }

          text.messageText {
            fill: var(--c-text);
            stroke: none;
          }
				`,
      })
      this.$refs.mermaid.innerHTML = this.graph
      m.init({ noteMargin: 10 }, this.$refs.mermaid)
    })
  },
}
</script>
<style scoped>
.mermaid-container {
  overflow: auto;
}

@media (max-width: 1440px) {
  .mermaid-container:has(> svg) {
    margin: -10vw 0;
  }
}
</style>
