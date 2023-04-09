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

# Set up the Vercel provider
provider "vercel" {
  api_token = var.vercel_api_token
}

# Declare variable
variable "vercel_api_token" {
  type      = string
  sensitive = true
}

# Set up the Cloudflare provider
provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# Declare variable
variable "cloudflare_api_token" {
  type      = string
  sensitive = true
}

# Configure project settings
resource "vercel_project" "yart_project" {
  name      = "yart"
  framework = "nextjs"

  git_repository = {
    type = "github"
    repo = "starptr/yart"
  }
}

# Configure deployment settings for project
resource "vercel_deployment" "yart_deploy" {
  project_id = vercel_project.yart_project.id
  ref        = "main"
  production = "true"
}

# Configure domain for project
resource "vercel_project_domain" "yart_domain" {
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
  # Subdomain
  name = "@"
  # Adds documentation-only comment to dashboard
  comment = "this record was set by terraform from starptr/yart"
  # HACK: Vercel generates default URL like this
  # Ideally, we get access to the IP address for an A record
  value   = "${vercel_project.yart_project.name}.vercel.app"
  type    = "CNAME"
  proxied = false
  ttl     = 1
}
