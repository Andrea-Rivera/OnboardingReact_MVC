using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Onboarding_React_MVC.Models
{
    public partial class Sales
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateSold { get; set; }

        public virtual Customers Customer { get; set; }
        public virtual Products Product { get; set; }
        public virtual Stores Store { get; set; }
    }
}
