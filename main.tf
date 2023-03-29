terraform {
  required_version = ">= 1.3.0"
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.11.4"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "4.0.0"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
}

variable "vercel_api_token" {
  type      = string
  sensitive = true
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

variable "cloudflare_api_token" {
  type      = string
  sensitive = true
}

resource "vercel_project" "yart_project" {
  name      = "yart-terra"
  framework = "hugo"

  git_repository = {
    type = "github"
    repo = "kdpuvvadi/vercel_hugo_blog"
  }
}

resource "vercel_project_environment_variable" "test_env" {
  project_id = vercel_project.yart_project.id
  key        = "HUGO_VERSION"
  value      = "0.110.0"
  target     = ["production"]
}

resource "vercel_deployment" "test_deploy" {
  project_id = vercel_project.yart_project.id
  ref        = "main"
  production = "true"

  project_settings = {
    build_command    = "hugo --gc --minify"
    output_directory = "/public"
    root_directory   = "/"
  }
}

resource "vercel_project_domain" "test_domain" {
  project_id = vercel_project.yart_project.id
  domain     = "yart.me"
}

data "cloudflare_zones" "get_zone_data" {
  filter {
    name = "yart.me"
  }
}

resource "cloudflare_record" "zone_blog_record" {
  zone_id = data.cloudflare_zones.get_zone_data.zones[0].id
  name    = "@"
  value   = vercel_deployment.test_deploy.domains[0]
  type    = "CNAME"
  proxied = false
  ttl     = 1
}
