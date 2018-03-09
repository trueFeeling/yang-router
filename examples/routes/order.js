export default function spring (req, res) {
    //const { query, params, body } = req;
    console.log('req',req);
    console.log('res:',res)
    const query = req.query;
    const params = req.params;
    const body = req.body;
    const style = `
     border-bottom: 1px, solid, #ddd;
     color: blue;
     font-weight: bold;
     width:100vw;
     height:10px;
    `;
    res.render(`
      <div class="content-container">
        <h2 class="content-header">订单</h2>
        <section>
          <div style="${style}">hello here</div>
          <div>params: ${JSON.stringify(params)}</div>
          <div>query: ${JSON.stringify(query)}</div>
          <div>body: ${JSON.stringify(body)}</div>
        </section>
        <section class='example-box'>
          <div class='example-head'># example</div>
          <div class='mes'>${body.mes}}</div>
        </section>
      </div>
    `)
  }