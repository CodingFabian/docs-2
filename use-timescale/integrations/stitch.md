---
title: Integrate Stitch with Timescale Cloud 
excerpt: Stitch is a cloud-based ETL service that helps businesses efficiently consolidate data from a variety of sources into a data warehouse. Integrate Stitch with Timescale Cloud and Eclipse Mosquitto
products: [cloud, mst, self_hosted]
keywords: [Eclipse Mosquitto, Stitch, IoT, MQTT, integrate]
---

import IntegrationPrereqs from "versionContent/_partials/_integration-prereqs.mdx";

# Integrate Stitch with $CLOUD_LONG

[Stitch][stitch] is a cloud-based ETL (Extract, Transform, Load) service that helps businesses efficiently consolidate data from a variety of sources. It is particularly useful for data integration and analytics, enabling organizations to make data-driven decisions.

[Eclipse Mosquitto][mosquitto] is an open-source MQTT broker widely used for lightweight messaging in IoT and mobile applications.

This page explains how to stream IoT data from Eclipse Mosquitto to $CLOUD_LONG using Stitch.

## Prerequisites

<IntegrationPrereqs />

- Install [Eclipse Mosquitto][mosquitto-install].
- Sign up for [Stitch Data][stitch-signup].

## Simulate IoT data in Eclipse Mosquitto

To prepare sample IoT data to stream to $CLOUD_LONG:

<Procedure>

1. **Start Eclipse Mosquitto**

   Run the following command:

   ```bash
   mosquitto -v
   ```
1. **Publish sample data**

   Run the following command to publish data to the `sensor/data` MQTT topic:

   ```bash
   mosquitto_pub -t sensor/data -m '{"temperature": 22.5, "humidity": 60}'
   ```

1. **Subscribe to topic**

   Run the following command to subscribe to the `sensor/data` topic:

   ```bash
   mosquitto_sub -t sensor/data
   ```

## Prepare your $SERVICE_LONG to ingest data

Create a table in $SERVICE_LONG to store IoT readings from Eclipse Mosquitto:

<Procedure>

1. **Connect to your $SERVICE_LONG**

   Use an [SQL editor][run-queries] in $CONSOLE. For self-hosted $TIMESCALE_DB, use [`psql`][psql].

1. **Create a hypertable in your $SERVICE_SHORT**

   ```sql
   CREATE TABLE sensor_data (
       time TIMESTAMPTZ NOT NULL,
       temperature FLOAT,
       humidity FLOAT
   );
   ```

1. **Convert the table into a hypertable**

   ```sql
   SELECT create_hypertable('sensor_data', 'time');
   ```

</Procedure>

## Connect Eclipse Mosquitto to $CLOUD_LONG with Stitch Data








To connect EMQX to $CLOUD_LONG:

<Procedure>

1. **Set up EMQX and Simulate IoT Data**

   **Create an MQTT Topic in EMQX Dashboard**
    - Log in to the **EMQX Dashboard**.
    - Navigate to **"Rule Engine"** > **"Resources"**.
    - Click **"Create"** to define a new resource for the MQTT topic.
    - Choose **"Data Bridge"** as the resource type.
    - Set the resource name as `sensor_data_resource` and configure the connection details.
    - Navigate to **"Rule Engine"** > **"Rules"**.
    - Click **"Create"** to define a new rule.
    - In the **SQL Editor**, enter the following rule to capture messages from the topic `iot/sensor_data`:

    ```sql
    SELECT * FROM "iot/sensor_data"
    ```

    - Set the action to **"Forwarding"** and select **"sensor_data_resource"** as the target resource.
    - Enable the rule to start capturing data.

   **Simulate IoT Data using EMQX Dashboard**
    - Navigate to **"Tools"** > **"WebSocket Client"** in the EMQX Dashboard.
    - Connect to the broker using the default WebSocket URL, e.g., `ws://localhost:8083/mqtt`.
    - Subscribe to the topic `iot/sensor_data` to monitor incoming messages.
    - Publish a sample message directly through the WebSocket Client interface:

    ```json
    {
        "device_id": "sensor_1",
        "temperature": 22.5,
        "humidity": 60,
        "timestamp": "2025-02-26T10:00:00Z"
    }
    ```

    - Verify that the message appears in the subscription logs.

2. **Configure Stitch Data to Connect EMQX to Timescale Cloud**

    - Log in to **Stitch Data**.
    - Select **Add Integration** and choose **EMQX** as the data source.
    - Configure the connection settings for your EMQX instance (broker address, port, and MQTT topic).
    - Select **Timescale Cloud** as the destination.
    - Map the incoming MQTT data fields to the appropriate schema in Timescale.
    - Test the connection to ensure data flows correctly.

3. **Create a Hypertable in Timescale Cloud**

    - Log in to **Timescale Cloud**.
    - Create a database for IoT data.
    - Run the following SQL to create a hypertable:

    ```sql
    CREATE TABLE sensor_data (
        device_id TEXT,
        timestamp TIMESTAMPTZ NOT NULL,
        temperature FLOAT,
        humidity FLOAT,
        PRIMARY KEY (device_id, timestamp)
    );

    SELECT create_hypertable('sensor_data', 'timestamp');
    ```

4. **Verify Data Flow in Timescale Cloud**

    - Query the hypertable to ensure data is streaming in:

    ```sql
    SELECT * FROM sensor_data ORDER BY timestamp DESC;
    ```

</Procedure>

You have successfully integrated EMQX with Timescale Cloud using Stitch Data. Now you can analyze your IoT data with powerful time-series queries and visualize it using your preferred analytics tools.

[stitch]: https://ua.stitchdata.com/
[emqx-download]: https://www.emqx.io/downloads
[emqx-cloud]: https://www.emqx.com/en/cloud
[stitch-signup]: https://www.stitchdata.com/
[run-queries]: /getting-started/:currentVersion:/run-queries-from-console/
[psql]: /use-timescale/:currentVersion:/integrations/psql/
[mosquitto]: https://mosquitto.org/documentation/
[mosquitto-install]: https://mosquitto.org/download/
[connection-info]: /use-timescale/:currentVersion:/integrations/find-connection-details/