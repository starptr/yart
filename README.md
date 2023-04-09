# YART

a collection of pieces of data, a.k.a. virtual trinkets

## Terraform

This project is deployed using terraform. However, running `terraform apply` is not required to deploy to production. This is because the terraform sets up a pipeline in Vercel
that automatically builds and deploys the latest commit in the `main` branch to production. The `git_repository` property in the `vercel_project` resource block suggests this;
instead of using the local git repository, the resource expects a cloud-based git repository to deploy from. Nevertheless, there are some situations in which you should run
`terraform apply`:

-   updating DNS records in cloudflare
-   changing which branch to deploy from
-   changing the domain

### Secrets

The easiest way to pass in API tokens is to use a `secret.tfvars` file and pass it into terraform commands with `--var-file="secret.tfvars"`. For example,

```
vercel_api_token = "asdf"
cloudflare_api_token = "asdf"
```
