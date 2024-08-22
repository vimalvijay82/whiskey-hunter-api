provider "google" {
    project = var.project_id
    region = var.region
    zone = var.zone
}

resource "google_compute_instance" "whiskey_instance" {
    name = "whiskey-server"
    machine_type = "e2-medium"

    boot_disk {
          initialize_params {
            image = "debian-cloud/debian-11"
        }
    }

    network_interface {
        network = "default"
        
        access_config{

        }
    }

    metadata = {
      ssh-keys = "vimal:ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0jlLpPyWYrhc7PEEW+7n9gbK0vujpNrw0WjF1KVb7xmkoQH5wSMwOJj8RURvYx2Ek7EBl3ufJbq4GPejsTCLec4nYOXgdC/5pWeiwI+KJRLujSAU8Z7M5GD3Kt2/pmfGIweRKcGVEyEBQ3M/L7MKo8y3cXYNoilPvLK32zoh3uQJ1ht/4CX4iiiiMnZsUuCwYKgnqMq6l/Q0mIEUNMUQGa9++Q25zQQOmd+gQGjZi1kWAAxKAJxfxNKyvMsdSfdxAzwb+nS7wmBKDiuLqx5b73AvwVeQmFiQ6UdprnUCu4LoeH2eG33+5Lo99jt1ezWsR8jjYGleKJvevgqVApa8N"
    }

    tags = ["whiskey-ssh-docker"]
}

resource "google_compute_firewall" "ssh_firewall" {
    name = "whiskey-ssh-docker"
    network = "default"

    allow {
        protocol = "tcp"
        ports = ["22", "8080", "80"]
    }

    source_ranges = ["0.0.0.0/0"]
    target_tags = ["whiskey-ssh-docker"]
}