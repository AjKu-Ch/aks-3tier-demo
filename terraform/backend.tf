terraform {
  backend "azurerm" {
    resource_group_name  = "tfstate-rg"
    storage_account_name = "tstate1909811330"
    container_name       = "tfstate"
    key                  = "aks-demo.tfstate"
  }
}
