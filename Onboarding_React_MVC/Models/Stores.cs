using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Onboarding_React_MVC.Models
{
    public partial class Stores
    {
        public Stores()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }

        [StringLength(50)]
        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
