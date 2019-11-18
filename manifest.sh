docker manifest create --amend ctrlaltdev/ssechat:latest ctrlaltdev/ssechat:amd64-latest ctrlaltdev/ssechat:arm32v6-latest ctrlaltdev/ssechat:arm64v8-latest
docker manifest annotate ctrlaltdev/ssechat:latest ctrlaltdev/ssechat:arm32v6-latest --os linux --arch arm
docker manifest annotate ctrlaltdev/ssechat:latest ctrlaltdev/ssechat:arm64v8-latest --os linux --arch arm64 --variant armv8
docker manifest push --purge ctrlaltdev/ssechat:latest
