## 流程

- {clientId: 'efb6c3fd-a357-4005-b283-7d5e87dec965', url: 'https://metrics.chartiq.com'} 'clientId'  // api/transaction/symbol/contract/priceParameter/list  同步的

- {"type":"ready-to-create"} 向父级发送消息

- {"type":"set-theme","payload":{"theme":"darken","klineBorderColor":"#D7ED47","klineBottomColor":"rgba(22, 29, 38, 0)","klineTopColor":"rgba(205, 233, 25, 0.5)","klineWidth":"2px"}}  来自父级的消息

- {"type":"render","payload":{"periodicity":"500ms","symbol":"BTC-USD","mode":"advanced"}} 来自父级的消息

-  {"type":"loading-change","payload":true} 向父级发送消息

- {"type":"positionOrder","payload":[]} 来自父级的消息Ï


- {clientId: 'efb6c3fd-a357-4005-b283-7d5e87dec965', url: 'https://metrics.chartiq.com'} 'clientId'

- {"type":"initial","payload":{"symbol":"BTC-USD","start":1733196290000,"end":1733196336389,"params":{"timeunit":"millisecond","interval":500}}} 向父级发送消息

- {"type":"draw","payload":[{"DT":"2024-12-03T03:25:36.540Z","Close":96056.09097}]} 来自父级的消息

- {"type":"initial","payload":[{"DT":"2024-12-03T03:22:36.632Z","Close":96040.96885},{"DT":"2024-12-03T03:22:37.133Z","Close":96040.63499},{"DT":"2024-12-03T03:22:37.634Z","Clo 

- {"type":"loading-change","payload":false} 向父级发送消息
- {"type":"draw","payload":[{"DT":"2024-12-03T03:25:37.041Z","Close":96055.97337}]} 来自父级的消息
- {"type":"draw","payload":[{"DT":"2024-12-03T03:25:37.541Z","Close":96056.07827}]} 来自父级的消息
...

-{"type":"render","payload":{"periodicity":"500ms","symbol":"BTC-USD","mode":"advanced"}} 来自父级的消息



- {"type":"render","payload":{"periodicity":"1m","symbol":"BTC-USD","mode":"advanced"}} 来自父级的消息
- {"type":"loading-change","payload":true} 向父级发送消息
- {"type":"initial","payload":{"symbol":"BTC-USD","start":1733191140000,"end":1733196667537,"params":{"timeunit":"minute","interval":1}}} 向父级发送消息
- {"type":"initial","payload":[{"DT":"2024-12-02T21:32:00.000Z","Date":"1733175120000","Close":95462.93702,"Open":95453.99588,"High":95468.54547,"Low":95415.77833},{"DT":"2024-12-0
- {"type":"loading-change","payload":false} 向父级发送消息

-{"type":"draw","payload":[{"DT":"2024-12-03T03:31:04.000Z","Date":"1733196664000","Close":96121.53124,"Open":96121.11171,"High":96121.58483,"Low":96120.92133}]} 来自父级的消息 

- {"type":"render","payload":{"periodicity":"1m","symbol":"BTC-USD","mode":"advanced"}} 来自父级的消息


## 验签处理

- clientId: 'efb6c3fd-a357-4005-b283-7d5e87dec965  5616

- e.logMetrics
 
- // e.logMetrics('ChartEngine.new'),

- destroy































