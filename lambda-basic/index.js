const { CloudWatch } = require("aws-sdk");
const cloudwatch = new CloudWatch({apiVersion: '2010-08-01'});

exports.handler = async (event, context) => {
  console.log("The event is ", event);

  const dimensionBad = {
    Name: "bad_log",
    Value: "SoBad"
  };

  const params = {
      MetricData: [
        {
          MetricName: "lambda-metrics",
          Dimensions: [
            dimensionBad
          ],
          StatisticValues: {
            Maximum: "1", /* required */
            Minimum: "1", /* required */
            SampleCount: 1, /* required */
            Sum: 1 /* required */
          }
        },
      ],
      Namespace: 'MyCloudTrailMetrics' /* required */
    };

  const res = await cloudwatch.putMetricData(params).promise();
  console.log("the res is ", res);
}
