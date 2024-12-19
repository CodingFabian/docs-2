---
title: Integrate $CLOUD_LONG with Amazon Kinesis
excerpt: Process, and analyze data streamed from $CLOUD_LONG with Amazon Kinesis 
products: [cloud, mst, self_hosted]
keywords: [visualizations, analytics, Tableau]
---

# Integrate $CLOUD_LONG with Amazon Kinesis

[Amazon Kinesis][get-kinesis] is a cloud service that processes and analyzes streaming data in real-time. You can 
use Amazon Kinesis to capture, store, and process data streamed from $CLOUD_LONG.

To integrate $CLOUD_LONG with Amazon Kinesis, you set up a data pipeline where data from Kinesis streams is 
ingested into TimescaleDB for storage and analysis. Follow these high-level steps to achieve this integration:

## Prerequisites

Before you begin, make sure you have:

*   Created a [$SERVICE_LONG][cloud-login].
    Remember to download  the cheatsheet when you created the service. It contains  
    the connection details for the $SERVICE_SHORT to use as a data source.
*   Signed up for an [Amazon Web Services (AWS)][get-aws] account.

To integrate Amazon Kinesis with Timescale Cloud, follow these steps:

## Prerequisites

Before you begin, ensure you have:

- Created a Timescale Cloud service.
- Signed up for an Amazon Web Services (AWS) account.

## Add Timescale as a Virtual Connection in Amazon Kinesis

1. **Set Up Amazon Kinesis Stream

   1. Go to the AWS Management Console.
   2. Navigate to Kinesis and create a new data stream.

2. **Create a Lambda Function**

   1. Go to AWS Lambda in the AWS Management Console.
   2. Create a new Lambda function.
   3. Configure the function to trigger on new records in your Kinesis stream.

1. *&Configure AWS Lambda to Connect to TimescaleDB

1. Add the necessary code to connect to TimescaleDB and insert data into your Lambda function.

```python
import json
import psycopg2

def lambda_handler(event, context):
    # Database connection parameters
    db_params = {
        "host": "your-timescale-db-host",
        "port": "5432",
        "dbname": "your-database-name",
        "user": "your-username",
        "password": "your-password"
    }

    # Establish connection to TimescaleDB
    conn = psycopg2.connect(**db_params)
    cursor = conn.cursor()

    # Process each record in the event
    for record in event['Records']:
        # Kinesis data is base64-encoded, so decode it
        payload = json.loads(record['kinesis']['data'])

        # Extract the data you need
        data_value = payload['your_data_field']

        # Insert data into TimescaleDB
        cursor.execute("INSERT INTO your_table (your_column) VALUES (%s)", (data_value,))

    # Commit the transaction and close the connection
    conn.commit()
    cursor.close()
    conn.close()

    return {
        'statusCode': 200,
        'body': json.dumps('Data inserted successfully')
    }
```

2. Package the Lambda function with the `psycopg2` library, as it is required for PostgreSQL connections.

### 5. Test the Integration

1. Send test data to your Kinesis stream.
2. Verify that the data appears in TimescaleDB.

### Notes

- Ensure that your Lambda function has the necessary permissions and network access to connect to TimescaleDB.
- Consider using VPCs, security groups, and IAM roles to secure your setup.

By following these steps, you can successfully integrate Timescale Cloud with Amazon Kinesis and create a real-time data pipeline.
