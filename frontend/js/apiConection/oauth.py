from __future__ import absolute_import, print_function

import tweepy

# == OAuth Authentication ==
#
# This mode of authentication is the new preferred way
# of authenticating with Twitter.

# The consumer keys can be found on your application's Details
# page located at https://dev.twitter.com/apps (under "OAuth settings")
consumer_key="mi8Cn50JkJyCpA8xdzBjxGVQw"
consumer_secret="z55ziQXMT6wWoyTI9dt8ZmepFeiUApeIoa6VUGxORV36IXlUpH"

# The access tokens can be found on your applications's Details
# page located at https://dev.twitter.com/apps (located
# under "Your access token")
access_token="157666898-rjletafrGBBXQlrGDyi4qsjbPWQgOQKtLX8Kszxd"
access_token_secret="FFbtSNq5665cXF8FAVvAa7DHTU2dYYXC2bYiB2HL4iHrV"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.secure = True
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

# If the authentication was successful, you should
# see the name of the account print out
print(api.me().name)

# If the application settings are set for "Read and Write" then
# this line should tweet out the message to your account's
# timeline. The "Read and Write" setting is on https://dev.twitter.com/apps
api.update_status(status='Updating using OAuth authentication via Tweepy!')