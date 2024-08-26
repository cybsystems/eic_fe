import Breadcrumbs from '@components/atoms/Breadcrumbs'
import PageGridContainer from '@components/atoms/PageGridContainer'

const ReportsPage = () => {
  return (
    <PageGridContainer>
              <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Reports", href: "/reports" },
        ]}
        title="Reports"
      />

    </PageGridContainer>
  )
}

export default ReportsPage