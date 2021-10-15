# Data

There are four data sets in this folder:

- [philosophers.json](./philosophers.json): A list of philosophers' information.
- [questions.json](./questions.json): A list of questions' information.
- [schools.json](./schools.json): A list of schools' information.
- [relations.csv](./relations.csv): A list of relations between philosophers, questions and schools.

The whole data sets is just like a graph: philosophers, questions and schools are nodes and relations are edges for this graph. Each nodes has a unique id and are connected by edges.

There are some [visualizations](https://observablehq.com/@pearmini/visualize-sophies-world-by-antv) can help you better understanding these data.

## Philosophers

| Field | Description | Type |
| ----| ----------- | -----|
| id | Unique id for this philosopher. | `number` |
| name | The name of this philosopher in Chinese. | `string` |
| lifespan | The birth year and death year of this philosopher, negative means BC and positive means AC. | `[number, number]` |
| country | The main country for this philosopher which can be used in geo vis. | `string` |
| points | The main philosophical points of view of this philosopher.| `string[]` |
| words | The key words of the points of this philosopher: weight represents the importance of this words in that context not frequency. | `Word[]` |

## Schools

| Field | Description | Type |
| ----| ----------- | -----|
| id | Unique id for this school. | `number` |
| name | The name of this school in Chinese. | `string` |
| type | The reason for the birth of this school: 'topic' means the philosophers in this school have similar points and 'country' means they are belong to the same country. | `topic` or `country` |
| points | The main philosophical points of view of this school. | `string[]` |
| words | The key words of the points of this philosopher: weight represents the importance of this words in that context not frequency. | `Word[]` |

## Questions

| Field | Description | Type |
| ----| ----------- | -----|
| id | Unique id for this question. | `number` |
| title | The title of this philosophical questions. | `string` |
| des? | The optional descriptions for this questions. | `string[]` |
| words | The key words of the title and des of this questions: weight represents the importance of this words in that context not frequency. | `Word[]` |

## Relations

| Field | Description | Type |
| ----| ----------- | -----|
| from | The id for one node. | `number` |
| to | The id for another node. | `number` |
| type | The type of this edge: `0` means this relation connected a school and philosopher, this philosopher belong to this school; `1` means this relation connected a question and a philosopher or school, this philosopher or school answer this question. | `0 or 1` |
