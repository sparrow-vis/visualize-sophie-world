# SparrowVis Challenge 2021

SparrowVis 2021 挑战赛的主要任务是：可视化《苏菲的世界》。

## 数据

一共有四组数据：

- [philosophers.json](./data/philosophers.json)
- [questions.json](./data/questions.json)
- [schools.json](./data/schools.json)
- [relations.csv](./data/relations.csv)

### philosophers.json

这里包含一些哲学家的名字：

| 字段 | 描述 | 种类 |
| ----| ----------- | -----|
| id | 唯一标识 | `number` |
| name | 名字 | `string` |
| lifespan | 出生日期和死亡日期：负数代表公元前，正数代表公元后 | `[number, number]` |
| country | 国家 | `string` |
| points | 主要观点 | `string[]` |
| words | 主要观点中一些关键字 | `Word[]` |

### schools.json

这里是一些哲学流派的名字：

| 字段 | 描述 | 种类 |
| ----| ----------- | -----|
| id | 唯一标识 | `number` |
| name | 名字 | `string` |
| type | 分类的标准：是根据国家还是话题 | `topic` or `country` |
| points | 主要观点 | `string[]` |
| words | 主要观点中的一些关键字 | `Word[]` |

### questions.json

这里是一些主要的问题：

| 字段 | 描述 | 种类 |
| ----| ----------- | -----|
| id | 唯一标识 | `number` |
| title | 标题 | `string` |
| des? | 描述| `string[]` |
| words | 关键字 | `Word[]` |

## relations.csv

这是一些关系的数据：

| 字段 | 描述 | 种类 |
| ----| ----------- | -----|
| from | 边的另一个节点的 ID | `number` |
| to | 边的一个节点的 ID | `number` |
| type | 边的种类：`0` 表示流派和哲学家，这个哲学家属于这个流派； `1` 问题和哲学家或者流派，这个哲学家或者流派回答了这个问题. | `0 or 1` |
