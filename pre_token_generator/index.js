// Ref. https://aws.amazon.com/blogs/security/use-amazon-cognito-to-add-claims-to-an-identity-token-for-fine-grained-authorization/

const {
  DynamoDBClient,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  region: 'ap-northeast-1' });

// PretokenGeneration Lambda
exports.handler = async function (event, context) {
    console.log(event);
    // event.userName is user name generated and managed by Cognito
    if (!event.userName) {
        return event;
    }

    const user_id = event.userName

    const { Item } = await client.send(
      new GetItemCommand({
        TableName: 'apprunner-demo',
        Key: {
          UserId: { S: user_id }
        }
      })
    );

    event.response = {
        "claimsOverrideDetails": {
            "claimsToAddOrOverride": {
                "user_id": user_id,
                "tenant_id": null,
                "role": null
            },
        }
    };

    console.log(Item);
    try {
        if (Item) {
            const tenant_id = Item.TenantId.S;
            const role = Item.Role.S;
            console.log("tenant_id = " + tenant_id);
            console.log("role = " + role);
            event.response.claimsOverrideDetails.claimsToAddOrOverride.tenant_id = tenant_id;
            event.response.claimsOverrideDetails.claimsToAddOrOverride.role = role;
        }
    }
    catch (error) {
        console.log(error);
    }

    return event;
};
