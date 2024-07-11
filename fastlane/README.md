fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## iOS
### ios build_development
```
fastlane ios build_development
```

### ios build_master
```
fastlane ios build_master
```

### ios cert_fetch
```
fastlane ios cert_fetch
```
Fetches the certificates and provisioning profiles to run the project on real devices
### ios cert_update_all
```
fastlane ios cert_update_all
```
Updates the all provisioning profiles
### ios cert_update_devel
```
fastlane ios cert_update_devel
```
Updates the provisioning profiles of development
### ios cert_update_adhoc
```
fastlane ios cert_update_adhoc
```
Updates the provisioning profiles of beta distribution
### ios bump_development
```
fastlane ios bump_development
```

### ios bump_master
```
fastlane ios bump_master
```


----

## Android
### android build_development
```
fastlane android build_development
```
Build the Android application.

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
