export default function spring (req, res) {
  const { query, params, body } = req;

  res.render(`
    <div class="content-container">
      <h2 class="content-header">外卖</h2>
      <section>
        <div>params: ${JSON.stringify(params)}</div>
        <div>query: ${JSON.stringify(query)}</div>
        <div>body: ${JSON.stringify(body)}</div>
        <section class='example-box'>
          <div class='example-head'># example</div>
          <div class='mes'>${body.mes}}</div>
        </section>
      </section>
    </div>
  `)
}