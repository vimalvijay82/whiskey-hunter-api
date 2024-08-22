variable "project_id" {
    type = string
    description = "Project ID of Portfolio Project"
    default = "portfolio-pipeline-432616"
}

variable "region" {
    type = string
    description = "Region where instance is running"
    default = "us-east1"
}

variable "zone" {
    type = string
    description = "Zone of the Compute Engine Instance"
    default = "us-east1-b"
}