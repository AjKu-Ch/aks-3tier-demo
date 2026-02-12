resource "azurerm_resource_group" "rg" {
  name     = "aks-demo-rg"
  location = "East US"
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-demo"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "aksdemo"

  default_node_pool {
    name       = "nodepool"
    node_count = 2
    vm_size    = "Standard_DC2s_v3"
    temporary_name_for_rotation  = "sysrot"
  }

  identity {
    type = "SystemAssigned"
  }
}
