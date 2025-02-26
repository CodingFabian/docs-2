---
title: Integrate Stitch Data with Timescale Cloud 
excerpt: Stitch Data is a cloud-based ETL service that helps businesses efficiently consolidate data from a variety of sources into a data warehouse. Integrate Stitch Data with Timescale Cloud
products: [cloud, mst, self_hosted]
keywords: [EMQX, Stitch Data, IoT, MQTT, integrate]
---

import IntegrationPrereqs from "versionContent/_partials/_integration-prereqs.mdx";

# Integrate Stitch Data with $CLOUD_LONG

[Stitch Data][stitch] is a cloud-based ETL (Extract, Transform, Load) service that helps businesses efficiently consolidate data from a variety of sources. It is particularly useful for data integration and analytics, enabling organizations to make data-driven decisions.

[EMQX][emqx] is a high-performance, open-source MQTT broker ideal for large-scale IoT data streaming. It supports millions of concurrent connections and provides robust features for data integration. 

This page explains how to stream IoT data from EMQX to $CLOUD_LONG using Stitch Data.

## Prerequisites

<IntegrationPrereqs />

- Install [open-source EMQX][emqx-download] or sign up for [EMQX Cloud][emqx-cloud].
- Sign up for [Stitch Data][stitch-signup].

## Create a topic and sample data in EMQX



## Prepare your $SERVICE_LONG to receive data 



## Connect EMQX to $CLOUD_LONG with Stitch Data








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

[emqx]: https://www.emqx.com
[stitch]: 
[emqx-download]: https://www.emqx.io/downloads
[emqx-cloud]: https://www.emqx.com/en/cloud
[stitch-signup]: https://www.stitchdata.com/