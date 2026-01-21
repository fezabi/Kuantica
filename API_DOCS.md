# API Documentation

This API provides access to various reports and data tables. All endpoints are protected and require authentication.

## Authentication

All requests must include the authentication token in the header (specific mechanism handled by `authenticateToken` middleware, usually Bearer token).

## Pagination

All list endpoints support cursor-based pagination using the following query parameters:

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `limit` | `number` | `20` | Number of items to return (1-200). |
| `cursor` | `string` | `null` | Cursor for the next page of results. |

## Endpoints

### Commercial Module

#### `GET /commercial/fct_funnel_diario`
Retrieves the daily funnel report.

*   **URL**: `/commercial/fct_funnel_diario`
*   **Method**: `GET`
*   **Cursor Field**: `id_funnel`
*   **Filters**:

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `fecha_dato_inicio` | `date` | Start date (YYYY-MM-DD) |
| `fecha_dato_fin` | `date` | End date (YYYY-MM-DD) |
| `proyecto_id` | `integer` | Filter by project ID |

#### `GET /commercial/fct_reservas_atribuidas`
Retrieves attributed reservations.

*   **URL**: `/commercial/fct_reservas_atribuidas`
*   **Method**: `GET`
*   **Cursor Field**: `reserva_id`
*   **Filters**:

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `fecha_reserva_inicio` | `date` | Start reservation date |
| `fecha_reserva_fin` | `date` | End reservation date |
| `proyecto_id` | `integer` | Filter by project ID |
| `rut_cliente` | `string` | Filter by client RUT |
| `estado_reserva` | `string` | Filter by status |

### Executive Module

#### `GET /executive/rpt_gestion_diaria`
Retrieves the daily management report.

*   **URL**: `/executive/rpt_gestion_diaria`
*   **Method**: `GET`
*   **Cursor Field**: `id_reporte`
*   **Filters**:

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `fecha_analisis_inicio` | `date` | Start analysis date |
| `fecha_analisis_fin` | `date` | End analysis date |

### Marketing Module

#### `GET /marketing/fct_contactos_diarios`
Retrieves daily contact metrics.

*   **URL**: `/marketing/fct_contactos_diarios`
*   **Method**: `GET`
*   **Cursor Field**: `id`
*   **Filters**:

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `contacto_key` | `string` | Filter by contact key |
| `fecha_contacto_inicio` | `date` | Start contact date |
| `fecha_contacto_fin` | `date` | End contact date |
| `proyecto_id` | `integer` | Filter by project ID |
| `rut_cliente` | `string` | Filter by client RUT |
| `es_nuevo_contacto` | `boolean` | Filter by new contact status |

#### `GET /marketing/fct_inversion_diaria`
Retrieves daily investment metrics.

*   **URL**: `/marketing/fct_inversion_diaria`
*   **Method**: `GET`
*   **Cursor Field**: `id_inversion`
*   **Filters**:

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `fecha_inversion_inicio` | `date` | Start investment date |
| `fecha_inversion_fin` | `date` | End investment date |
| `proyecto_id` | `integer` | Filter by project ID |
